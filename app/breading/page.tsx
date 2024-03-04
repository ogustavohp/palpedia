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
            queue.push([parent1, parents.concat([parentPair])])
            queue.push([parent2, parents.concat([parentPair])])
          }
        }
      }
    }

    if (combinations.length === 0) {
      return 'Não foi encontrada uma combinação de breeding para chegar ao pal especificado.'
    }

    return combinations
  }

  console.log(
    findBreedingCombination('Frostallion Noct', 'Anubis', breedingMapDb),
  )
  return (
    // <>
    //   {palsBreadingDb.map((pal, i) => {
    //     const uniqueArray = uniqueElements(pal.parents)
    //     return (
    //       <>
    //         <Typography key={i}>{pal.pal}</Typography>
    //         <Typography key={i}>
    //           [{uniqueArray.map((e) => `"${e}"`).join(', ')}],
    //         </Typography>
    //       </>
    //     )
    //   })}
    // </>
    <Typography>oi</Typography>
  )
}
