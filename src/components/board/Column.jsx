import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ data, dataIso, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({ id: dataIso })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 220,
        minHeight: 320,
        border: "2px solid #444",
        borderRadius: 8,
        padding: 8
      }}
    >
      <strong>
        {data.toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit"
        })}
      </strong>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordens.map(ordem => (
          <Card key={ordem.id} ordem={ordem} modoTv={modoTv} />
        ))}
      </div>
    </div>
  )
}
