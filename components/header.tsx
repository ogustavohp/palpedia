import React from 'react'
import { TypographyH1 } from './typography'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="mx-6 mt-6 flex justify-between">
      <TypographyH1>Palpedia</TypographyH1>
      <ModeToggle />
    </header>
  )
}
