import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 200,
        padding: 8,
        border: "2px solid #444",
        background: isOver ? "#1e2a3a" : "transparent"
      }}
    >
      <strong>{dia}</strong>
      <div style={{ fontSize: 12 }}>
        {data.toLocaleDateString("pt-BR")}
      </div>

      {ordens.map(o => (
        <Card key={o.id} {...o} modoTv={modoTv} />
      ))}

      <small>{totalHoras.toFixed(1)} h</small>
    </div>
  )
}





