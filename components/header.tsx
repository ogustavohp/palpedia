import React from 'react'
import { Typography } from './typography'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="mx-6 mt-6 flex justify-between">
      <Typography variant="h1">Palpedia</Typography>
      <ModeToggle />
    </header>
  )
}
