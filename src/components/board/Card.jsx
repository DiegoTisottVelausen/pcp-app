import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Card({
  id,
  produto,
  operacao,
  tempo,
  modoTv
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: modoTv
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        padding: 10,
        border: "2px solid #666",
        borderRadius: 6,
        background: "#2a2a2a",
        cursor: "grab"
      }}
    >
      <strong>{produto}</strong>
      <div>{operacao}</div>
      <small>{tempo}h</small>
    </div>
  )
}




