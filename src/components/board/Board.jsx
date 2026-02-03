import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  function formatarIsoLocal(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

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
      if (novaCarga > 8) {
        setMensagem(`Não é possível mover: ${novaCarga.toFixed(1)}h (limite 8h)`)
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

  // 👉 calcular segunda-feira LOCAL
  const base = new Date(dataBaseSemana)
  base.setHours(0, 0, 0, 0)

  const diaSemana = base.getDay()
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    d.setHours(0, 0, 0, 0)
    return d
  })

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => (
          <Column
            key={formatarIsoLocal(data)}
            dia={data}
            droppableId={formatarIsoLocal(data)}
            ordens={ordens.filter(o => o.dataEntrega === formatarIsoLocal(data))}
            modoTv={modoTv}
          />
        ))}
      </div>
    </DndContext>
  )
}








