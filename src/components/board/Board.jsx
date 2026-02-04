import { DndContext } from "@dnd-kit/core"
import Column from "./Column"

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function getWeek(baseDate) {
  const base = new Date(baseDate)
  base.setHours(12, 0, 0, 0)

  const day = base.getDay() || 7
  base.setDate(base.getDate() - (day - 1))

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return formatDate(d)
  })
}

export default function Board({ ordens, setOrdens, dataBaseSemana }) {
  const dias = getWeek(dataBaseSemana)

  console.log("🟢 Board render | semana:", dias)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    console.log("🟡 DRAG END")
    console.log("➡️ Card:", active.id)
    console.log("⬇️ Drop em:", over.id)

    setOrdens(prev =>
      prev.map(o =>
        o.id === active.id
          ? { ...o, dataEntrega: over.id }
          : o
      )
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {dias.map(dateKey => (
          <Column
            key={dateKey}
            dateKey={dateKey}
            ordens={ordens}
          />
        ))}
      </div>
    </DndContext>
  )
}












