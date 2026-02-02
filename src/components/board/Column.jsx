import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId
  })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)
  const capacidadeMaxima = 8
  const excedeu = totalHoras > capacidadeMaxima

  function formatarData(d) {
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 220,
        padding: 8,
        borderRadius: 8,
        border: `2px solid ${isOver ? "#4da6ff" : excedeu ? "#ff4d4d" : "#444"}`,
        background: isOver ? "#1c2733" : "transparent"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{dia}</strong>
          <div style={{ fontSize: 12 }}>{formatarData(data)}</div>
        </div>
        <div style={{ fontSize: 12 }}>
          {totalHoras.toFixed(1)} / {capacidadeMaxima}h
        </div>
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordenarPorPrioridade(ordens).map(ordem => (
          <Card
            key={ordem.id}
            id={ordem.id}
            produto={ordem.produto}
            operacao={ordem.operacao}
            tempo={ordem.tempo}
            dataEntrega={ordem.dataEntrega}
            origem={ordem.origem}
            modoTv={modoTv}
          />
        ))}
      </div>
    </div>
  )
}




