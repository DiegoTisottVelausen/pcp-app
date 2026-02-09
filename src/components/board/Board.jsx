import { DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"

/**
 * Gera lista de dias únicos ordenados
 */
function gerarSemana(ordens) {
  const datas = [...new Set(ordens.map(o => o.data))]
  return datas.sort()
}

/**
 * Filtra ordens por data
 */
function filtrarPorData(ordens, data) {
  return ordens.filter(o => o.data === data)
}

export default function Board({
  ordens,
  setOrdens,
  onDragEnd
}) {

  const datasSemana = gerarSemana(ordens)

  /**
   * Drag finalizado
   */
  function handleDragEnd(result) {
    if (!result.destination) return

    const { draggableId, destination } = result
    const novaData = destination.droppableId

    const novasOrdens = ordens.map(o =>
      o.id === draggableId
        ? { ...o, data: novaData, origem: "simulado" }
        : o
    )

    setOrdens(novasOrdens)

    // dispara callback pro Dashboard recalcular KPIs
    if (onDragEnd) onDragEnd(novasOrdens)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => (
          <Column
            key={data}
            data={data}
            ordens={filtrarPorData(ordens, data)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}


