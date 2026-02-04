import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {

  const { setNodeRef, isOver } = useDroppable({
    id: droppableId
  })

  console.log("📦 Render coluna:", dia, droppableId, ordens.length)

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 220,
        minHeight: 300,
        padding: 8,
        borderRadius: 8,
        border: "2px solid #444",
        background: isOver ? "#1f2937" : "transparent",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <strong>{dia}</strong>
      <small>{droppableId}</small>

      {ordens.map(o => (
        <Card
          key={o.id}
          id={o.id}
          produto={o.produto}
          operacao={o.operacao}
          tempo={o.tempo}
          origem={o.origem}
          modoTv={modoTv}
        />
      ))}
    </div>
  )
}









