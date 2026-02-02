import { DndContext, closestCenter } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({ ordens, setOrdens, setMensagem, modoTv, dataBaseSemana }) {

  function handleDragEnd({ active, over }) {
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id // YYYY-MM-DD

    setOrdens(prev =>
      prev.map(o =>
        o.id === ordemId
          ? { ...o, dataEntrega: novaDataIso, origem: "manual" }
          : o
      )
    )
  }

  // calcula segunda
  const base = new Date(dataBaseSemana)
  const diff = (base.getDay() === 0 ? -6 : 1 - base.getDay())
  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diff)

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => {
          const iso = data.toISOString().slice(0, 10)
          return (
            <Column
              key={iso}
              droppableId={iso}
              data={data}
              ordens={ordens.filter(o => o.dataEntrega === iso)}
              modoTv={modoTv}
            />
          )
        })}
      </div>
    </DndContext>
  )
}



