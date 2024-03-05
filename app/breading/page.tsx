import { Typography } from '@/components/typography'
import { breedingMap, breedingMapType } from '@/db/db'

// const palsBreadingDb = palsBreading

const breedingMapDb = breedingMap

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

  function findBreedingCombination2(
    targetPal: keyof typeof breedingMapDb,
    ancestorPal: keyof typeof breedingMapDb,
    breedingMap: breedingMapType,
  ) {
    // console.log(targetPal)
    // console.log(ancestorPal)
    // console.log(breedingMap)
  }
  findBreedingCombination2('Frostallion Noct', 'Anubis', breedingMapDb)

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
    return null // Retorna null se não encontrar correspondência
  }

  console.log(findCombination(['Faleris', 'Anubis']))

  return (
    <div className="flex gap-4 flex-col">
      {resultPals.map((e, i) => (
        <div className="" key={`${e}-${i}`}>
          {e.map((e, i) => (
            <div
              key={`${e}-${i}`}
            >{`${e[0]} + ${e[1]} = ${findCombination(e)} `}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
