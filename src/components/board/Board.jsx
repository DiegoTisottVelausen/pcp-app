import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  function dateKey(d) {
    if (typeof d === "string") return d
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  function handleDragEnd({ active, over }) {
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id

    setOrdens(prev => {
      const ordem = prev.find(o => o.id === ordemId)
      if (!ordem) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((s, o) => s + o.tempo, 0)

      if (horasNoDestino + ordem.tempo > 8) {
        setMensagem("Capacidade excedida (8h)")
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

  // calcula segunda-feira local (SEM UTC)
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
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map((data, i) => {
          const key = dateKey(data)
          const rotulos = ["SEG", "TER", "QUA", "QUI", "SEX"]

          return (
            <Column
              key={key}
              dia={rotulos[i]}
              data={data}
              droppableId={key}
              modoTv={modoTv}
              ordens={ordens.filter(o => o.dataEntrega === key)}
            />
          )
        })}
      </div>
    </DndContext>
  )
}






