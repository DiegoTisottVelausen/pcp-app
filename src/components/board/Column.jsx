import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  const total = ordens.reduce((s, o) => s + o.tempo, 0)

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 200,
        border: `2px solid ${total > 8 ? "#ff4d4d" : "#444"}`,
        background: isOver ? "#1f2937" : "transparent",
        padding: 8,
        borderRadius: 8
      }}
    >
      <strong>{dia}</strong>
      <div style={{ fontSize: 12 }}>
        {data.toLocaleDateString("pt-BR")}
      </div>

      <div style={{ marginTop: 8 }}>
        {ordens.map(o => (
          <Card key={o.id} {...o} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}





