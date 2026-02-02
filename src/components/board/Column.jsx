import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({
  dia,
  data,
  droppableId,
  ordens,
  modoTv
}) {
  const { setNodeRef } = useDroppable({
    id: droppableId
  })

  const ordensOrdenadas = ordenarPorPrioridade(ordens)

  const totalHoras = ordens.reduce(
    (soma, ordem) => soma + ordem.tempo,
    0
  )

  const capacidadeMaxima = 8
  const excedeuCapacidade = totalHoras > capacidadeMaxima

  function formatarDataColuna(d) {
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: modoTv ? 240 : 180,
        maxWidth: modoTv ? 280 : 220,
        flexShrink: 0,
        border: `2px solid ${excedeuCapacidade ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        padding: 8,
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        background: excedeuCapacidade ? "#2b1a1a" : "transparent"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{dia}</strong>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {formatarDataColuna(data)}
          </div>
        </div>

        <div
          style={{
            fontSize: 12,
            color: excedeuCapacidade ? "#ff4d4d" : "#aaa"
          }}
        >
          {totalHoras.toFixed(1)} / {capacidadeMaxima} h
        </div>
      </div>

      <SortableContext
        items={ordensOrdenadas.map(o => o.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flexGrow: 1
          }}
        >
          {ordensOrdenadas.map(ordem => (
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
      </SortableContext>
    </div>
  )
}
