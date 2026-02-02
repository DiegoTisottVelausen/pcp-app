import { DndContext, closestCorners } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {
  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id // yyyy-mm-dd

    setOrdens(prev =>
      prev.map(o =>
        o.id === ordemId
          ? { ...o, dataEntrega: novaDataIso, origem: "manual" }
          : o
      )
    )
  }

  // calcula segunda-feira
  const base = new Date(dataBaseSemana)
  const dia = base.getDay()
  const diff = dia === 0 ? -6 : 1 - dia

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diff)
  segunda.setHours(0, 0, 0, 0)

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => {
          const dataIso = data.toISOString().slice(0, 10)

          return (
            <SortableContext
              key={dataIso}
              items={ordens
                .filter(o => o.dataEntrega === dataIso)
                .map(o => o.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                data={data}
                dataIso={dataIso}
                ordens={ordens.filter(o => o.dataEntrega === dataIso)}
                modoTv={modoTv}
              />
            </SortableContext>
          )
        })}
      </div>
    </DndContext>
  )
}

