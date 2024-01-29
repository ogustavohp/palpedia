import { ReactNode } from 'react'

interface TypographyChildrenProps {
  children: ReactNode
}
export function TypographyH1({ children }: TypographyChildrenProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}
export function TypographySmall({ children }: TypographyChildrenProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}
