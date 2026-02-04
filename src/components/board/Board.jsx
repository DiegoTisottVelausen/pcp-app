import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

function gerarSemana(dataBase) {
  const base = new Date(`${dataBase}T12:00:00`)
  const dia = base.getDay()
  const diff = dia === 0 ? -6 : 1 - dia
  base.setDate(base.getDate() + diff)

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return d.toISOString().slice(0, 10)
  })
}

export default function Board({ ordens, setOrdens, setMensagem, dataBaseSemana }) {
  const semana = gerarSemana(dataBaseSemana)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const novaData = over.id

    setOrdens(prev =>
      prev.map(o =>
        o.id === active.id
          ? { ...o, dataEntrega: novaData, origem: "manual" }
          : o
      )
    )
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 16 }}>
        {semana.map(data => (
          <Column
            key={data}
            data={data}
            droppableId={data}
            ordens={ordens.filter(o => o.dataEntrega === data)}
          />
        ))}
      </div>
    </DndContext>
  )
}
