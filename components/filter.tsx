'use client'
import { useState } from 'react'
import { Input } from './ui/input'

export function Filter() {
  const [search, setSearch] = useState('')
  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}
