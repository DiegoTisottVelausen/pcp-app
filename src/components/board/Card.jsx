import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Card({
  id,
  produto,
  operacao,
  tempo,
  origem,
  modoTv
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: modoTv
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: 12,
    border: "2px solid #444",
    borderRadius: 8,
    background: "#2a2a2a",
    cursor: modoTv ? "default" : "grab"
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{produto}</strong>
      <div style={{ fontSize: 13 }}>{operacao}</div>
      <small>{tempo} h {origem === "manual" && "🔧"}</small>
    </div>
  )
}
