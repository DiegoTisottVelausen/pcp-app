import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 220,
        minHeight: 300,
        border: "2px solid #444",
        borderRadius: 8,
        padding: 8,
        background: isOver ? "#222" : "transparent"
      }}
    >
      <strong>{data.toLocaleDateString("pt-BR")}</strong>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordens.map(ordem => (
          <Card key={ordem.id} {...ordem} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}








