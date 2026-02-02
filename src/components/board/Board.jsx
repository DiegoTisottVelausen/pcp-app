import { DndContext, closestCenter } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  function handleDragEnd({ active, over }) {
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id

    // garante que é uma data yyyy-mm-dd
    if (!/^\d{4}-\d{2}-\d{2}$/.test(novaDataIso)) return

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)
      if (!ordemMovida) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((soma, o) => soma + o.tempo, 0)

      const novaCarga = horasNoDestino + ordemMovida.tempo
      const capacidadeMaxima = 8

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

  // ---- semana atual ----
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
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          overflowX: "auto",
          padding: "8px 0",
          paddingLeft: 16   // 👈 evita sumir SEG
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            minWidth: 1000
          }}
        >
          {datasSemana.map((data, index) => {
            const iso = data.toISOString().slice(0, 10)
            const rotulos = ["SEG", "TER", "QUA", "QUI", "SEX"]

            return (
              <Column
                key={iso}
                dia={rotulos[index]}
                data={data}
                droppableId={iso}
                ordens={ordens.filter(o => o.dataEntrega === iso)}
                modoTv={modoTv}
              />
            )
          })}
        </div>
      </div>
    </DndContext>
  )
}


