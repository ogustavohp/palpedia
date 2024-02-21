import React from 'react'
import Image from 'next/image'
import { TypographySmall } from './typography'
import { Progress } from './ui/progress'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Send } from 'lucide-react'

interface CardProps {
  name: string
  caught: string
  imagePath: string
  number: string
  element: string[]
  workSkill: {
    skill: string
    lv: string
  }[]
}

export function Card({
  name,
  caught,
  imagePath,
  number,
  element,
  workSkill,
}: CardProps) {
  const caughtCounter = false
  const caughtNumber = parseInt(caught)

  return (
    <div className="relative w-40 h-[10.5rem] rounded bg-secondary">
      <div>
        {/* name */}
        <span
          className={
            caughtCounter
              ? `absolute left-2`
              : 'absolute w-full text-center bottom-1.5'
          }
        >
          <TypographySmall>{name}</TypographySmall>
        </span>

        {/* number */}
        {!caughtCounter && (
          <span className="absolute left-2">
            <TypographySmall># {number}</TypographySmall>
          </span>
        )}

        {/* element */}
        <span className={`absolute top-4`}>
          {element.map((e, i) => (
            <Image
              key={e}
              alt={e}
              src={`/icon/element/${e}.webp`}
              width={20}
              height={20}
              className={`relative ${i === 0 ? 'top-2 left-2' : 'left-5'}`}
            />
          ))}
          {/* <Image alt={e} /> */}
        </span>

        {/* work */}
        <span className="flex rtl flex-col gap-1 absolute right-3 top-2 flex-wrap max-h-14">
          {/* <span className="grid rtl top-2 right-3 grid-cols-2 absolute rtl:grid"> */}
          {workSkill.map((e, i) => (
            <div
              key={`${e.skill}-${i}-${e.lv}`}
              className="flex items-center bg-secondary"
            >
              <TypographySmall>{e.lv}</TypographySmall>
              <Image
                alt={`${e.skill} lv ${e.lv}`}
                src={`/icon/work/${e.skill}.webp`}
                width={16}
                height={16}
              />
            </div>
          ))}
        </span>

        <Image
          alt={`pal ${name}`}
          src={imagePath}
          width={160}
          height={160}
          className="rounded-full p-10"
        />
      </div>

      {caughtCounter ? (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'ghost'}
                size={'sm'}
                className="absolute right-[3.25rem] bottom-1 w-14 text-center hover:bg-primary-foreground/90"
              >
                <TypographySmall>{`${caught}/10`}</TypographySmall>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Capture count for {name}</DialogTitle>
                <DialogDescription>
                  Enter the number of {name} pals you&apos;ve captured so far:
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="palsCaught" className="sr-only">
                    caught
                  </Label>
                  <Input
                    id="palsCaught"
                    type="number"
                    min={0}
                    defaultValue={caught}
                  />
                </div>

                <DialogClose asChild>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Send</span>
                    <Send size={16} />
                  </Button>
                </DialogClose>
              </div>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant={'secondary'}>
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Progress
            className="absolute bottom-0"
            value={(caughtNumber / 10) * 100}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
}
