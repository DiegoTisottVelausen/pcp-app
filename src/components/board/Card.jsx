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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id,
    disabled: modoTv
  })

  console.log("🃏 Render card:", id)

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: 12,
    borderRadius: 8,
    background: "#2a2a2a",
    border: "2px solid #555",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <strong>{produto}</strong>
      <div>{operacao}</div>
      <small>{tempo}h {origem === "manual" && "🔧"}</small>
    </div>
  )
}





