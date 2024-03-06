import { Card } from '@/components/card'
import { breedingMap, breedingMapType, pals } from '@/db/db'
import { Equal, PlusCircle } from 'lucide-react'

// const palsBreadingDb = palsBreading

const breedingMapDb = breedingMap
const palsDb = pals

export default function Breading() {
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

  // function findBreedingCombination2(
  //   targetPal: keyof typeof breedingMapDb,
  //   ancestorPal: keyof typeof breedingMapDb,
  //   breedingMap: breedingMapType,
  // ) {
  // console.log(targetPal)
  // console.log(ancestorPal)
  // console.log(breedingMap)
  // }
  // findBreedingCombination2('Frostallion Noct', 'Anubis', breedingMapDb)

  const resultPals = findBreedingCombination(
    'Frostallion Noct',
    'Anubis',
    breedingMapDb,
  )

  // console.log(resultPals)

  if (typeof resultPals === 'string') {
    return
  }

  function findCombination(array: string[]) {
    for (const key in breedingMapDb) {
      if (Object.prototype.hasOwnProperty.call(breedingMapDb, key)) {
        const subArrays = breedingMapDb[key]

        for (const subarray of subArrays) {
          if (array.every((element) => subarray.includes(element))) {
            return key
          }
        }
      }
    }
    return '' // Retorna null se não encontrar correspondência
  }

  console.log(findCombination(['Faleris', 'Anubis']))

  function findPalObj(palName: string) {
    return palsDb.find((obj) => obj.name === palName)
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {resultPals.map((e, i) => (
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
                <PlusCircle />
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
      ))}
    </div>
  )
}
