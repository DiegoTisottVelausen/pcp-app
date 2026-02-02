import { DndContext, pointerWithin } from "@dnd-kit/core"
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

    if (!/^\d{4}-\d{2}-\d{2}$/.test(novaDataIso)) return

    const capacidadeMaxima = 8

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)
      if (!ordemMovida) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((s, o) => s + o.tempo, 0)

      const novaCarga = horasNoDestino + ordemMovida.tempo

      if (novaCarga > capacidadeMaxima) {
        setMensagem(
          `Não é possível mover: ${novaCarga.toFixed(1)}h (limite ${capacidadeMaxima}h)`
        )
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

  // 👉 calcula segunda-feira
  const base = new Date(dataBaseSemana)
  const diaSemana = base.getDay()
  const diff = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diff)
  segunda.setHours(0, 0, 0, 0)

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  const rotulos = ["SEG", "TER", "QUA", "QUI", "SEX"]

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map((data, index) => {
          const dataIso = data.toISOString().slice(0, 10)

          return (
            <Column
              key={dataIso}
              dia={rotulos[index]}
              data={data}
              droppableId={dataIso}
              ordens={ordens.filter(o => o.dataEntrega === dataIso)}
              modoTv={modoTv}
            />
          )
        })}
      </div>
    </DndContext>
  )
}





