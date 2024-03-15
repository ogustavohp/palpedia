import React from 'react'
import { Typography } from './typography'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="px-6 mt-6 flex justify-between max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 lg:gap-20">
        <Typography variant="h1">Palpedia</Typography>
        <Link href={'/breeding'}>
          <Typography>Breeding</Typography>
        </Link>
      </div>
      <ModeToggle />
    </header>
  )
}
