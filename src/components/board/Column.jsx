import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)
  const excedeu = totalHoras > 8

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 200,
        border: `2px solid ${isOver ? "#4da6ff" : excedeu ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        padding: 8,
        background: isOver ? "#1f2a38" : "transparent"
      }}
    >
      <strong>{dia}</strong>
      <div style={{ fontSize: 12 }}>
        {data.toLocaleDateString("pt-BR")}
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordenarPorPrioridade(ordens).map(o => (
          <Card key={o.id} {...o} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}







