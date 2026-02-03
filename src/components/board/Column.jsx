import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ dia, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 200,
        border: "2px solid #444",
        borderRadius: 8,
        padding: 8,
        background: isOver ? "#1f2933" : "transparent"
      }}
    >
      <strong>
        {dia.toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase()}
      </strong>
      <div style={{ fontSize: 12 }}>
        {dia.toLocaleDateString("pt-BR")}
      </div>

      <div style={{ fontSize: 12, marginBottom: 6 }}>
        {totalHoras.toFixed(1)} / 8h
      </div>

      {ordens.map(ordem => (
        <Card key={ordem.id} {...ordem} modoTv={modoTv} />
      ))}
    </div>
  )
}






