import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  // 🔹 calcula segunda-feira da semana atual
  const base = new Date(dataBaseSemana)
  const diaSemana = base.getDay() // 0 dom, 1 seg...
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)
  segunda.setHours(0, 0, 0, 0)

  // 🔹 cria SEG → SEX como datas reais
  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  function handleDragEnd(event) {
    const { active, over } = event

    console.log("🟡 DRAG END")
    console.log("active.id:", active?.id)
    console.log("over.id:", over?.id)

    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id // 🔥 SEMPRE yyyy-mm-dd

    // segurança
    if (!/^\d{4}-\d{2}-\d{2}$/.test(novaDataIso)) {
      console.warn("⛔ over.id não é data válida:", novaDataIso)
      return
    }

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)

      if (!ordemMovida) {
        console.error("❌ ordem não encontrada:", ordemId)
        return prev
      }

      console.log("ANTES:", ordemMovida.dataEntrega)
      console.log("DEPOIS:", novaDataIso)

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

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map(data => {
          const iso = data.toISOString().slice(0, 10)

          console.log("📅 COLUNA:", iso)

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










