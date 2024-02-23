import React from 'react'
import { Typography } from './typography'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mx-6 mt-6 flex justify-between">
      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 lg:gap-20">
        <Typography variant="h1">Palpedia</Typography>
        <Link href={'/breading'}>
          <Typography>Breading</Typography>
        </Link>
      </div>
      <ModeToggle />
    </header>
  )
}
