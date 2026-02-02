import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Card({ id, produto, operacao, tempo, origem, modoTv }) {
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
        border: "2px solid #444",
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
        cursor: "grab",
        background: origem === "manual" ? "#2a2a2a" : "#1f1f1f"
      }}
    >
      <strong>{produto}</strong>
      <div>{operacao}</div>
      <small>{tempo}h</small>
    </div>
  )
}

