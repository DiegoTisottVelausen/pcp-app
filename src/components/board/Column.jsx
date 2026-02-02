import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"

export default function Column({ droppableId, data, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({ id: droppableId })

  return (
    <div ref={setNodeRef} style={{ minWidth: 220 }}>
      <strong>{data.toLocaleDateString("pt-BR")}</strong>

      {ordens.map(ordem => (
        <Card key={ordem.id} id={ordem.id} {...ordem} modoTv={modoTv} />
      ))}
    </div>
  )
}


