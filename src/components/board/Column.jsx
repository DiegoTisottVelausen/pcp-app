import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  console.log("📦 Render coluna:", data, ordens.length)

  const ordenadas = ordenarPorPrioridade(ordens)

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 220,
        minHeight: 300,
        padding: 8,
        borderRadius: 8,
        border: "2px solid #444",
        background: isOver ? "#1f2933" : "#111",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <strong>{dia}</strong>
      <small>{data}</small>

      {ordenadas.map(ordem => (
        <Card key={ordem.id} {...ordem} modoTv={modoTv} />
      ))}
    </div>
  )
}








