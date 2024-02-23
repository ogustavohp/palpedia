'use client'
import { Card } from '@/components/card'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { elements, pals, workSuitability } from '@/db/db'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'

const palsDb = pals
const elementsDb = elements
const worksDb = workSuitability

type elementSearchType =
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fire'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'neutral'
  | 'water'

type workSearchType =
  | 'cooling'
  | 'farming'
  | 'gathering'
  | 'generatingElectricity'
  | 'handiwork'
  | 'kindling'
  | 'lumbering'
  | 'medicineProduction'
  | 'mining'
  | 'planting'
  | 'transporting'
  | 'watering'

export default function Home() {
  const [filteredPals, setFilteredPals] = useState(palsDb)
  const [inputSearch, setInputSearch] = useState('')
  const [elementSearch, setElementSearch] = useState<elementSearchType[]>([])
  const [workSearch, setWorkSearch] = useState<workSearchType[]>([])

  function handleFilterPals(e: ChangeEvent<HTMLInputElement>) {
    setInputSearch(e.target.value)
    // filterPals()
  }

  function handleElementSearch(e: elementSearchType[]) {
    setElementSearch(e)
    // filterPals()
    // if (elementSearch.length === 0) return setFilteredPals(palsDb)
  }

  // function filterPals() {
  //   setFilteredPals(
  //     palsDb.filter((pal) => pal.name.toLowerCase().includes(inputSearch)),
  //   )
  //   // if (elementSearch.length === 0) return setFilteredPals(palsDb)
  //   if (elementSearch.length > 0) {
  //     setFilteredPals(
  //       filteredPals.filter((pal) =>
  //         // maybe change for every
  //         elementSearch.some((element) => pal.element.includes(element)),
  //       ),
  //     )
  //   }
  // }

  // function filterPals() {
  //   const filteredBySearchInput = palsDb.filter((pal) =>
  //     pal.name.toLowerCase().includes(inputSearch),
  //   )
  //   if (elementSearch.length > 0) {
  //     const filteredByElement = filteredBySearchInput.filter((pal) =>
  //       elementSearch.some((element) => pal.element.includes(element)),
  //     )
  //     setFilteredPals(filteredByElement)
  //     return
  //   }
  //   setFilteredPals(filteredBySearchInput)
  // }

  function handleWorkSearch(e: workSearchType[]) {
    setWorkSearch(e)
  }

  useEffect(() => {
    function filterPals() {
      let filtered = palsDb.filter((pal) =>
        pal.name.toLowerCase().includes(inputSearch),
      )
      if (elementSearch.length > 0) {
        filtered = filtered.filter((pal) =>
          elementSearch.every((element) => pal.element.includes(element)),
        )
      }
      if (workSearch.length) {
        filtered = filtered.filter((pal) =>
          workSearch.every((work) =>
            pal.workSkill.some((workObj) => workObj.skill === work),
          ),
        )
      }
      setFilteredPals(filtered)
    }
    filterPals()
  }, [elementSearch, inputSearch, workSearch])

  return (
    <div className="flex flex-col gap-4 max-w-[76rem]">
      <Input onChange={handleFilterPals} />
      {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7"> */}
      <ToggleGroup type="multiple" onValueChange={handleElementSearch}>
        {elementsDb.map((e, i) => (
          <ToggleGroupItem key={`${e.name}-${i}`} value={e.value}>
            <Image
              alt={`${e.name} icon`}
              src={e.srcImage}
              width={24}
              height={24}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup type="multiple" onValueChange={handleWorkSearch}>
        {worksDb.map((e, i) => (
          <ToggleGroupItem key={`${e.name}-${i}`} value={e.value}>
            <Image
              alt={`${e.name} icon`}
              src={e.srcImage}
              width={24}
              height={24}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex flex-wrap justify-center gap-x-4">
        {/* <div className="grid grid-flow-col auto-cols-max gap-4 md:auto-cols-min"> */}
        {filteredPals.map((e) => (
          <Card
            key={e.id}
            name={e.name}
            imagePath={e.image}
            number={e.number}
            element={e.element}
            caught={e.caught}
            workSkill={e.workSkill}
          />
        ))}
        <span className="w-40 h-0" />
        <span className="w-40 h-0" />
        <span className="w-40 h-0" />
        <span className="w-40 h-0" />
        <span className="w-40 h-0" />
        <span className="w-40 h-0" />
      </div>
    </div>
  )
}
