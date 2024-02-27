import { Typography } from '@/components/typography'
import { palsBreading } from '@/db/db'

const palsBreadingDb = palsBreading

export default function Breading() {
  function uniqueElements(arr: string[][]): string[] {
    const uniqueElementsSet: Set<string> = new Set()

    arr.forEach((subArr) => {
      subArr.forEach((element) => {
        uniqueElementsSet.add(element)
      })
    })
    return Array.from(uniqueElementsSet)
  }
  // const printPals = palsBreadingDb.map(pal => )
  return (
    <>
      {palsBreadingDb.map((pal, i) => {
        const uniqueArray = uniqueElements(pal.parents)
        return (
          <>
            <Typography key={i}>{pal.pal}</Typography>
            <Typography key={i}>
              [{uniqueArray.map((e) => `"${e}"`).join(', ')}],
            </Typography>
          </>
        )
      })}
    </>
  )
}
