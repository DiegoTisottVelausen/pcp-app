import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  estaAtrasada,
  diasDeAtraso,
  nivelDeAtraso
} from "../../utils/pcpCalculations"

export default function Card({
  id,
  produto,
  operacao,
  tempo,
  dataEntrega,
  origem,
  modoTv
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: modoTv
  })

  const atrasada = estaAtrasada({ dataEntrega })
  const diasAtraso = diasDeAtraso({ dataEntrega })
  const nivel = nivelDeAtraso({ dataEntrega })

  const cores = {
    leve: { background: "#3a331a", border: "#e6c84f" },
    medio: { background: "#3a261a", border: "#ff9f43" },
    critico: { background: "#3a1f1f", border: "#ff4d4d" },
    ok: { background: "#2a2a2a", border: "#444" }
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        padding: 12,
        background: cores[nivel].background,
        border: `2px solid ${cores[nivel].border}`,
        borderRadius: 8,
        cursor: "grab"
      }}
    >
      <strong>{produto}</strong>
      <p style={{ margin: "4px 0", fontSize: 13 }}>{operacao}</p>

      <small>
        {tempo} h{" "}
        {atrasada && (
          <span style={{ color: cores[nivel].border }}>
            ⚠ {diasAtraso} dia{diasAtraso > 1 ? "s" : ""}
          </span>
        )}
      </small>
    </div>
  )
}


