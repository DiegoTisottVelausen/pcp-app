import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"

export default function Column({
  dia,
  dataIso,
  droppableId,
  ordens,
  modoTv
}) {
  const { setNodeRef, isOver } = useDroppable({
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
        minWidth: modoTv ? 240 : 180,
        maxWidth: modoTv ? 280 : 220,
        flexShrink: 0,
        border: `2px solid ${excedeu ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        padding: 8,
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        background: isOver
          ? "#1f2a36"
          : excedeu
          ? "#2b1a1a"
          : "transparent"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{dia}</strong>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {new Date(dataIso).toLocaleDateString("pt-BR")}
          </div>
        </div>

        <span
          style={{
            fontSize: 12,
            color: excedeu ? "#ff4d4d" : "#aaa",
            fontWeight: excedeu ? "bold" : "normal"
          }}
        >
          {totalHoras.toFixed(1)} / {capacidadeMaxima} h
        </span>
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
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
    </div>
  )
}





