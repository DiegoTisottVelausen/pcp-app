import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

function formatarDataLocal(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

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
    const novaDataIso = over.id
    const capacidadeMaxima = 8

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)
      if (!ordemMovida) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((s, o) => s + o.tempo, 0)

      const novaCarga = horasNoDestino + ordemMovida.tempo

      if (novaCarga > capacidadeMaxima) {
        setMensagem(`Não é possível mover: ${novaCarga.toFixed(1)}h (limite ${capacidadeMaxima}h)`)
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

  // segunda-feira local correta
  const base = new Date(dataBaseSemana)
  const diaSemana = base.getDay()
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)
  segunda.setHours(0, 0, 0, 0)

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => {
          const dataIso = formatarDataLocal(data)

          return (
            <Column
              key={dataIso}
              dia={["SEG", "TER", "QUA", "QUI", "SEX"][data.getDay() - 1]}
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








