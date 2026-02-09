import { DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"

/**
 * Gera dias únicos da semana
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
  setOrdens,
  capacidadePorDia,
  capacidadePorMaquinaEDia,
  onDragEnd
}) {

  const dataSemana = gerarSemana(ordens)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>

        {dataSemana.map(data => {

          const ordensDia = filtrarPorData(ordens, data)

          return (
            <Column
              key={data}
              data={data}
              droppableId={data}
              ordens={ordensDia}
              capacidadeDia={capacidadePorDia?.[data] || 0}
              capacidadeMaquinas={capacidadePorMaquinaEDia?.[data] || {}}
            />
          )
        })}

      </div>
    </DragDropContext>
  )
}


