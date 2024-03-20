'use client'
import { Card } from '@/components/card'
import { SimpleCard } from '@/components/simple-card'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { breedingMap, breedingMapType, pals } from '@/db/db'
import { Equal, Plus, User } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

const breedingMapDb = breedingMap
const palsDb = pals

interface targetPalType {
  palName: string
  imageSrc: string
}

interface ancestorPalType {
  palName: string
  imageSrc: string
}

export default function Breeding() {
  const [filteredPals, setFilteredPals] = useState(palsDb)
  const [targetPal, setTargetPal] = useState<targetPalType>()
  const [ancestorPal, setAncestorPal] = useState<ancestorPalType>()
  const [resultBreeding, setResultBreeding] = useState<string | string[][][]>(
    '',
  )
  // function uniqueElements(arr: string[][]): string[] {
  //   const uniqueElementsSet: Set<string> = new Set()

  //   arr.forEach((subArr) => {
  //     subArr.forEach((element) => {
  //       uniqueElementsSet.add(element)
  //     })
  //   })
  //   return Array.from(uniqueElementsSet)
  // }

  // function findBreedingCombination(
  //   targetPal: string,
  //   ancestorPal: string,
  //   breedingMap: breedingMapType,
  // ) {
  //   if (!breedingMap[ancestorPal] || !breedingMap[targetPal]) {
  //     return 'Pal não encontrado no mapa de breeding.'
  //   }

  //   const queue: [string, string[][]][] = [[targetPal, []]]
  //   const visited = new Set()

  //   while (queue.length > 0) {
  //     const nextItem = queue.shift()

  //     if (!nextItem) break

  //     const [currentPal, parents] = nextItem

  //     visited.add(currentPal)
  //     if (currentPal === ancestorPal) {
  //       return parents
  //     }

  //     if (breedingMap[currentPal]) {
  //       const possibleParents = breedingMap[currentPal]
  //       console.log(queue)

  //       for (const parentPair of possibleParents) {
  //         const [parent1, parent2] = parentPair

  //         if (!visited.has(parent1) && !visited.has(parent2)) {
  //           // console.log(`${parent1} + LOG: ${parentPair}`)
  //           // console.log(`${parent2} + LOG: ${parentPair}`)
  //           queue.push([parent1, parents.concat([parentPair])])
  //           queue.push([parent2, parents.concat([parentPair])])
  //         }
  //       }
  //     }
  //   }
  //   return 'Não foi encontrada uma combinação de breeding para chegar ao pal especificado.'
  // }

  function findBreedingCombination(
    targetPal: string,
    ancestorPal: string,
    breedingMap: breedingMapType,
  ): string[][][] | string {
    if (!breedingMap[ancestorPal] || !breedingMap[targetPal]) {
      return 'Pal não encontrado no mapa de breeding.'
    }

    const queue: [string, string[][]][] = [[targetPal, []]]
    const visited = new Set<string>()
    const combinations: string[][][] = []

    while (queue.length > 0) {
      const nextItem = queue.shift()

      if (!nextItem) break

      const [currentPal, parents] = nextItem

      visited.add(currentPal)

      if (currentPal === ancestorPal) {
        combinations.push(parents)
      }

      if (breedingMap[currentPal]) {
        const possibleParents = breedingMap[currentPal]

        for (const parentPair of possibleParents) {
          const [parent1, parent2] = parentPair

          if (!visited.has(parent1) && !visited.has(parent2)) {
            const newParents = [...parents, parentPair]
            queue.push([parent1, newParents])
            queue.push([parent2, newParents])
          }
        }
      }
    }

    if (combinations.length === 0) {
      return 'Não foi encontrada uma combinação de breeding para chegar ao pal especificado.'
    }

    return combinations
  }

  const resultPals = findBreedingCombination(
    'Cattiva',
    'Chikipi',
    breedingMapDb,
  )

  // console.log(resultPals)

  useEffect(() => {
    function findPal() {
      if (targetPal && ancestorPal) {
        const breedingCombinationResult = findBreedingCombination(
          targetPal.palName,
          ancestorPal.palName,
          breedingMapDb,
        )
        return breedingCombinationResult
      }

      if (targetPal) {
        // const breedingCombinationResult = {
        //   targetPal: targetPal.palName,
        //   BreedingCombination: breedingMapDb[targetPal.palName],
        // }
        return [breedingMapDb[targetPal.palName]]
      }

      return ''
    }
    setResultBreeding(findPal())
  }, [targetPal, ancestorPal])

  if (typeof resultPals === 'string') {
    return
  }

  function findCombination(array: string[]) {
    for (const key in breedingMapDb) {
      if (Object.prototype.hasOwnProperty.call(breedingMapDb, key)) {
        const subArrays = breedingMapDb[key]

        for (const subarray of subArrays) {
          if (
            (subarray[0] === array[0] && subarray[1] === array[1]) ||
            (subarray[0] === array[1] && subarray[1] === array[0])
          ) {
            return key
          }
        }
      }
    }
    return '' // Retorna null se não encontrar correspondência
  }

  function findPalObj(palName: string) {
    return palsDb.find((obj) => obj.name === palName)
  }

  function handleDialogFilterSearch(e: ChangeEvent<HTMLInputElement>) {
    setFilteredPals(
      palsDb.filter((pal) =>
        pal.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
  }

  function handleSelectTargetPal(palName: string, imageSrc: string) {
    setFilteredPals(palsDb)
    const targetPalObject = { palName, imageSrc }
    setTargetPal(targetPalObject)
  }

  function handleSelectAncestorPal(palName: string, imageSrc: string) {
    setFilteredPals(palsDb)
    const ancestorPalObject = { palName, imageSrc }
    setAncestorPal(ancestorPalObject)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10 justify-center items-center">
        <div className="text-center space-y-2">
          <Typography>Target Pal</Typography>
          <Dialog>
            <DialogTrigger asChild>
              {targetPal ? (
                <Button variant="outline" className="h-32 w-48">
                  <SimpleCard
                    imageSrc={targetPal.imageSrc}
                    palName={targetPal.palName}
                    large
                  />
                </Button>
              ) : (
                <Button variant="outline" className="h-32 w-48">
                  <User /> Select target pal
                </Button>
              )}
            </DialogTrigger>

            <DialogContent className="w-4/5 max-w-3xl">
              <DialogHeader>
                <DialogTitle>Select target pal</DialogTitle>

                <DialogDescription>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex">
                  <Label htmlFor="name" className="text-right sr-only">
                    Name
                  </Label>

                  <Input
                    id="name"
                    onChange={(e) => handleDialogFilterSearch(e)}
                  />
                </div>

                <div className=""></div>
              </div>

              <DialogFooter>
                <div className="flex flex-wrap justify-center content-start gap-2 overflow-y-auto h-60 overflow-x-hidden">
                  {filteredPals.map((e) => (
                    <DialogClose asChild key={e.id}>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleSelectTargetPal(e.name, e.image)}
                      >
                        <SimpleCard imageSrc={e.image} palName={e.name} />
                      </Button>
                    </DialogClose>
                  ))}
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="text-center space-y-2">
          <Typography>Ancestor Pal</Typography>
          <Dialog>
            <DialogTrigger asChild>
              {ancestorPal ? (
                <Button variant="outline" className="h-32 w-48">
                  <SimpleCard
                    imageSrc={ancestorPal.imageSrc}
                    palName={ancestorPal.palName}
                    large
                  />
                </Button>
              ) : (
                <Button variant="outline" className="h-32 w-48">
                  <User /> Select ancestor pal
                </Button>
              )}
            </DialogTrigger>

            <DialogContent className="w-4/5 max-w-3xl">
              <DialogHeader>
                <DialogTitle>Select ancestor pal</DialogTitle>

                <DialogDescription>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex">
                  <Label htmlFor="name" className="text-right sr-only">
                    Name
                  </Label>

                  <Input
                    id="name"
                    onChange={(e) => handleDialogFilterSearch(e)}
                  />
                </div>

                <div className=""></div>
              </div>

              <DialogFooter>
                <div className="flex flex-wrap justify-center content-start gap-2 overflow-y-auto h-60 overflow-x-hidden">
                  {filteredPals.map((e) => (
                    <DialogClose asChild key={e.id}>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleSelectAncestorPal(e.name, e.image)}
                      >
                        <SimpleCard imageSrc={e.image} palName={e.name} />
                      </Button>
                    </DialogClose>
                  ))}
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                  <div className="w-40 h-0"></div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-center gap-4 flex-wrap">
        {typeof resultBreeding === 'string' ? (
          <div>{resultBreeding}</div>
        ) : (
          resultBreeding.map((e, i) => (
            <div
              className="bg-primary-foreground rounded pb-4 px-4"
              key={`${e}-${i}`}
            >
              {e.map((e, i) => {
                const parent1 = findPalObj(e[0])
                const parent2 = findPalObj(e[1])
                const palResult = findPalObj(findCombination(e))
                if (!parent1 || !parent2 || !palResult) {
                  return (
                    <div key={`${e}+${i}`}>
                      {e[0]}+{e[1]}+{e[2]}
                    </div>
                  )
                }

                return (
                  <div
                    className="flex gap-2 justify-center items-center"
                    key={`${e}-${i}`}
                  >
                    <Card
                      name={parent1.name}
                      imagePath={parent1.image}
                      number={parent1.number}
                      element={parent1.element}
                      caught={parent1.caught}
                      workSkill={parent1.workSkill}
                    />
                    <Plus />
                    <Card
                      name={parent2.name}
                      imagePath={parent2.image}
                      number={parent2.number}
                      element={parent2.element}
                      caught={parent2.caught}
                      workSkill={parent2.workSkill}
                    />
                    <Equal />
                    <Card
                      name={palResult.name}
                      imagePath={palResult.image}
                      number={palResult.number}
                      element={palResult.element}
                      caught={palResult.caught}
                      workSkill={palResult.workSkill}
                    />
                  </div>
                )
              })}
            </div>
          ))
        )}
        {/* {resultPals.map((e, i) => (
          <div
            className="bg-primary-foreground rounded pb-4 px-4"
            key={`${e}-${i}`}
          >
            {e.map((e, i) => {
              const parent1 = findPalObj(e[0])
              const parent2 = findPalObj(e[1])
              const palResult = findPalObj(findCombination(e))
              if (!parent1 || !parent2 || !palResult) {
                return (
                  <div key={`${e}+${i}`}>
                    {e[0]}+{e[1]}+{e[2]}
                  </div>
                )
              }

              return (
                <div
                  className="flex gap-2 justify-center items-center"
                  key={`${e}-${i}`}
                >
                  <Card
                    name={parent1.name}
                    imagePath={parent1.image}
                    number={parent1.number}
                    element={parent1.element}
                    caught={parent1.caught}
                    workSkill={parent1.workSkill}
                  />
                  <Plus />
                  <Card
                    name={parent2.name}
                    imagePath={parent2.image}
                    number={parent2.number}
                    element={parent2.element}
                    caught={parent2.caught}
                    workSkill={parent2.workSkill}
                  />
                  <Equal />
                  <Card
                    name={palResult.name}
                    imagePath={palResult.image}
                    number={palResult.number}
                    element={palResult.element}
                    caught={palResult.caught}
                    workSkill={palResult.workSkill}
                  />
                </div>
              )
            })}
          </div>
        ))} */}
      </div>
    </div>
  )
}
