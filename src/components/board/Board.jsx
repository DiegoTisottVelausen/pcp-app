import { DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"

/**
 * Gera lista de dias únicos ordenados
 */
function gerarSemana(ordens) {
  const datas = [...new Set(ordens.map(o => o.dataEntrega))]
  return datas.sort()
}

/**
 * Filtra ordens por dia
 */
function filtrarPorData(ordens, data) {
  return ordens.filter(o => o.dataEntrega === data)
}

export default function Board({
  ordens,
  capacidadePorDia,
  capacidadePorMaquinaEDia,
  onDragEnd
}) {
  const datasSemana = gerarSemana(ordens)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        
        {datasSemana.map(data => (
          <Column
            key={data}
            data={data}
            ordens={filtrarPorData(ordens, data)}
            capacidadeDia={capacidadePorDia?.[data]}
            capacidadeMaquinas={capacidadePorMaquinaEDia?.[data]}
          />
        ))}

      </div>
    </DragDropContext>
  )
}
