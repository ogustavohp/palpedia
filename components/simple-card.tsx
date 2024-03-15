import Image from 'next/image'
import { Typography } from './typography'

interface SimpleCardProps {
  imageSrc: string
  palName: string
  large?: boolean
}

export function SimpleCard({
  imageSrc,
  palName,
  large = false,
}: SimpleCardProps) {
  return (
    <div className="flex justify-between items-center gap-2 w-32">
      <Image
        alt=""
        src={imageSrc}
        width={large ? 60 : 30}
        height={large ? 60 : 30}
        className="rounded-full bg-muted"
      />
      <Typography variant="small">{palName}</Typography>
    </div>
  )
}
