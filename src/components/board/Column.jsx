import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ dateKey, ordens }) {
  const { setNodeRef, isOver } = useDroppable({
    id: dateKey
  })

  const ordensDoDia = ordens.filter(
    o => o.dataEntrega === dateKey
  )

  console.log("📦 Render coluna:", dateKey, ordensDoDia.length)
  console.log(
  "📦 Render coluna:",
  dia,
  data.toISOString().slice(0, 10),
  ordens.length
)


  return (
    <div
      ref={setNodeRef}
      style={{
        width: 220,
        minHeight: 300,
        border: "1px solid #ccc",
        padding: 8,
        background: isOver ? "#f0f8ff" : "#fff"
      }}
    >
      <strong>{dateKey}</strong>

      {ordensDoDia.map(o => (
        <Card key={o.id} ordem={o} />
      ))}
    </div>
  )
}










