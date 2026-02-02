import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import { ordenarPorPrioridade } from "../../utils/pcpCalculations"


export default function Column({ dia, data, droppableId, ordens, modoTv }) {
  const { setNodeRef } = useDroppable({
    id: droppableId
  })


    function formatarDataColuna(d) {
        return d.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        })
    }


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
            minWidth: modoTv ? 240 : 180,
            maxWidth: modoTv ? 280 : 220,
            flexShrink: 0,     // 👈 impede “esmagar”
            border: `2px solid ${excedeuCapacidade ? "#ff4d4d" : "#444"}`,
            borderRadius: 8,
            padding: 8,
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: excedeuCapacidade ? "#2b1a1a" : "transparent"
        }}
    >
        <div style={{ display: "flex", justifyContent: "space-between" }}>



            <div style={{ display: "flex", flexDirection: "column" }}>
                <strong>{dia}</strong>
                <span style={{ fontSize: 12, opacity: 0.8 }}>
                    {formatarDataColuna(data)}
                </span>
            </div>

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
                origem={ordem.origem}
                modoTv={modoTv}
                onResetToErp={() => {
                    setOrdens(prev =>
                    prev.map(o =>
                        o.id === ordem.id
                        ? {
                            ...o,
                            dia: diaDaSemana(o.dataEntrega),
                            origem: "erp"
                            }
                        : o
                    )
                    )
                }}
            />


        ))}
      </div>
    </div>
  )
}
