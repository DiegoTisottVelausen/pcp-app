import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function Card({ ordem, modoTv }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ordem.id, disabled: modoTv })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 12,
    background: "#2a2a2a",
    border: "2px solid #444",
    borderRadius: 8,
    cursor: "grab"
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{ordem.produto}</strong>
      <div>{ordem.operacao}</div>
      <small>{ordem.tempo} h</small>
    </div>
  )
}
