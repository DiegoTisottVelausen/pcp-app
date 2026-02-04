import { useDraggable } from "@dnd-kit/core"

export default function Card({ ordem }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: ordem.id })

  console.log("🃏 Render card:", ordem.id, ordem.dataEntrega)
  console.log("🃏 Render card:", id)

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: 8,
        marginTop: 8,
        background: "#333",
        color: "#fff",
        borderRadius: 6,
        cursor: "grab",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined
      }}
    >
      <div>{ordem.produto}</div>
      <small>{ordem.operacao}</small>
    </div>
  )
}






