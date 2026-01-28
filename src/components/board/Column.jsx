import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"


export default function Column({ dia, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({
    id: dia
  })

    const totalHoras = ordens.reduce(
        (soma, ordem) => soma + ordem.tempo,
        0
        )

    const capacidadeMaxima = 8
    const excedeuCapacidade = totalHoras > capacidadeMaxima
    const ordensOrdenadas = ordenarPorPrioridade(ordens)


return (
    <div
      ref={setNodeRef}
      style={{
            flex: 1,
            border: `2px solid ${excedeuCapacidade ? "#ff4d4d" : "#444"}`,
            borderRadius: 8,
            padding: 8,
            minHeight: 220,
            background: excedeuCapacidade ? "#2b1a1a" : "transparent"
        }}
    >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{dia}</strong>
                <span
                    style={{
                        fontSize: 12,
                        color: excedeuCapacidade ? "#ff4d4d" : "#aaa",
                        fontWeight: excedeuCapacidade ? "bold" : "normal"
                    }}
                >
                    {totalHoras.toFixed(1)} / {capacidadeMaxima} h
                </span>
        </div>


      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {ordensOrdenadas.map(ordem => (
            <Card
                key={ordem.id}
                id={ordem.id}
                produto={ordem.produto}
                operacao={ordem.operacao}
                tempo={ordem.tempo}
                dataEntrega={ordem.dataEntrega}
                modoTv={modoTv}
            />

        ))}
      </div>
    </div>
  )
}
