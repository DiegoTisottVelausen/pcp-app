import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({
    id: droppableId
  })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)
  const capacidadeMaxima = 8
  const excedeu = totalHoras > capacidadeMaxima
  const ordensOrdenadas = ordenarPorPrioridade(ordens)

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 200,
        maxWidth: 240,
        flexShrink: 0,
        border: `2px solid ${excedeu ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        padding: 8,
        minHeight: 320,
        background: excedeu ? "#2b1a1a" : "transparent",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <strong>{dia}</strong>
      <span style={{ fontSize: 12 }}>
        {data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
      </span>

      <div style={{ marginTop: 8, flexGrow: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordensOrdenadas.map(ordem => (
          <Card key={ordem.id} {...ordem} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}

