import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { estaAtrasada, diasDeAtraso, nivelDeAtraso } from "../../utils/pcpCalculations"

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

  // ✅ PRIMEIRO calcula
    const atrasada = estaAtrasada({ dataEntrega })
    const diasAtraso = diasDeAtraso({ dataEntrega })
    const nivel = nivelDeAtraso({
                                  dataEntrega,
                                  tempo,
                                  produto,
                                  operacao
                                })

  // ✅ DEPOIS usa
    const cores = {
    leve: {
        background: "#3a331a",
        border: "#e6c84f"
    },
    medio: {
        background: "#3a261a",
        border: "#ff9f43"
    },
    critico: {
        background: "#3a1f1f",
        border: "#ff4d4d"
    },
    ok: {
        background: "#2a2a2a",
        border: "#444"
    }
    }

    const style = {
      transform: CSS.Translate.toString(transform),
      padding: 12,
      fontSize: 14,
      background: cores[nivel].background,
      border: `2px solid ${cores[nivel].border}`,
      borderRadius: 8,
      cursor: "grab"
    }



  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{produto}</strong>
        {origem === "manual" && (
          <span style={{ fontSize: 12, opacity: 0.8 }}>
            🔧
          </span>
        )}
      </div>

      <p style={{ margin: "4px 0", fontSize: 13 }}>{operacao}</p>

      <small>
        {tempo} h{" "}
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

