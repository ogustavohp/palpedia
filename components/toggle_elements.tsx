'use client'
import Image from 'next/image'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { elements } from '@/db/db'
import { useState } from 'react'

const elementsDb = elements

export function ToggleElements() {
  const [element, setElement] = useState<string[]>([])
  function handleElementSearch(e: string[]) {
    if (e) setElement(e)
  }

  return (
    <ToggleGroup
      type="multiple"
      value={element}
      onValueChange={handleElementSearch}
    >
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
  )
}
