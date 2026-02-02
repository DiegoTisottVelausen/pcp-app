import { useSortable } from "@dnd-kit/sortable"
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
  modoTv,
  onResetToErp
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    disabled: modoTv
  })

  const atrasada = estaAtrasada({ dataEntrega })
  const diasAtraso = diasDeAtraso({ dataEntrega })
  const nivel = nivelDeAtraso({
    dataEntrega,
    tempo,
    produto,
    operacao
  })

  const cores = {
    leve: { background: "#3a331a", border: "#e6c84f" },
    medio: { background: "#3a261a", border: "#ff9f43" },
    critico: { background: "#3a1f1f", border: "#ff4d4d" },
    ok: { background: "#2a2a2a", border: "#444" }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 12,
    fontSize: 14,
    background: cores[nivel].background,
    border: `2px solid ${cores[nivel].border}`,
    borderRadius: 8,
    cursor: modoTv ? "default" : "grab"
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={() => {
        if (origem === "manual" && onResetToErp) {
          onResetToErp()
        }
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{produto}</strong>
        {origem === "manual" && <span style={{ fontSize: 12 }}>🔧</span>}
      </div>

      <p style={{ margin: "4px 0", fontSize: 13 }}>{operacao}</p>

      <small>
        {tempo} h
        {atrasada && (
          <span
            style={{
              color: cores[nivel].border,
              marginLeft: 6,
              fontSize: 12
            }}
          >
            ⚠ {diasAtraso} dia{diasAtraso > 1 ? "s" : ""} atrasado
          </span>
        )}
      </small>
    </div>
  )
}
