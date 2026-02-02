import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ data, droppableId, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({
    id: droppableId
  })

  const totalHoras = ordens.reduce((s, o) => s + o.tempo, 0)
  const capacidadeMaxima = 8
  const excedeu = totalHoras > capacidadeMaxima

  function formatarData(d) {
    return d.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: modoTv ? 240 : 180,
        border: `2px solid ${excedeu ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        padding: 8,
        minHeight: 300,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{formatarData(data)}</strong>
        <span style={{ fontSize: 12 }}>
          {totalHoras.toFixed(1)} / {capacidadeMaxima}h
        </span>
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordens.map(ordem => (
          <Card key={ordem.id} {...ordem} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}



