import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  datasSemana
}) {

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)
      if (!ordemMovida) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((s, o) => s + o.tempo, 0)

      const novaCarga = horasNoDestino + ordemMovida.tempo
      const capacidadeMaxima = 8

      if (novaCarga > capacidadeMaxima) {
        setMensagem(`Capacidade excedida (${novaCarga}h)`)
        return prev
      }

      setMensagem("")
      return prev.map(o =>
        o.id === ordemId
          ? { ...o, dataEntrega: novaDataIso, origem: "manual" }
          : o
      )
    })
  }

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => {
          const iso = data.toISOString().slice(0, 10)
          return (
            <Column
              key={iso}
              dia={["SEG","TER","QUA","QUI","SEX"][data.getDay()-1]}
              data={data}
              droppableId={iso}
              ordens={ordens.filter(o => o.dataEntrega === iso)}
              modoTv={modoTv}
            />
          )
        })}
      </div>
    </DndContext>
  )
}








