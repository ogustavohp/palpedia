import { Card } from '@/components/card'
import { pals } from '@/db/db'

const palsDb = pals

export default function Home() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {palsDb.map((e) => (
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
    </div>
  )
}
