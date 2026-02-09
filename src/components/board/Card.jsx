import { useDraggable } from "@dnd-kit/core"
import { Draggable } from "@hello-pangea/dnd"
import { CSS } from "@dnd-kit/utilities"

export default function Card({ ordem }) {
  if (!ordem) return null

  return (
    <div className="card">
      <div className="card-header">
        <strong>{ordem.id}</strong>
      </div>

      <div className="card-body">
        <div>{ordem.produto}</div>
        <div>{ordem.operacao}</div>
        <div>{ordem.maquina}</div>
        <div>{ordem.tempo} h</div>
      </div>
    </div>
  )
}








