import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Card({ id, produto, operacao, tempo }) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        padding: 8,
        background: "#2a2a2a",
        border: "2px solid #555",
        borderRadius: 6,
        cursor: "grab"
      }}
    >
      <strong>{produto}</strong>
      <div>{operacao}</div>
      <small>{tempo}h</small>
    </div>
  )
}








