import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Card({ id, produto, operacao, tempo, modoTv }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
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
        padding: 12,
        border: "1px solid #444",
        cursor: "grab"
      }}
    >
      <strong>{produto}</strong>
      <p>{operacao}</p>
      <small>{tempo}h</small>
    </div>
  )
}
