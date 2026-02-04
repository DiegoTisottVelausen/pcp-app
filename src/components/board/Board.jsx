import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  console.log("🟢 Board render | dataBaseSemana:", dataBaseSemana)

  function toDateKey(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  // 🧮 calcula segunda-feira corretamente (LOCAL)
  const base = new Date(dataBaseSemana)
  base.setHours(12, 0, 0, 0) // 🔥 evita bug de fuso

  const diaSemana = base.getDay() // 0 = domingo
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)

  console.log("📅 Segunda calculada:", segunda, toDateKey(segunda))

  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d
  })

  datasSemana.forEach(d =>
    console.log("📆 Coluna criada:", toDateKey(d))
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    console.log("🟡 DRAG END")
    console.log("➡️ Card:", active.id)
    console.log("⬇️ Drop em:", over.id)

    const ordemId = active.id
    const novaData = over.id

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)

      console.log("🔍 Ordem encontrada:", ordemMovida)

      if (!ordemMovida) return prev

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaData)
        .reduce((s, o) => s + o.tempo, 0)

      const novaCarga = horasNoDestino + ordemMovida.tempo
      console.log("⏱️ Nova carga:", novaCarga)

      if (novaCarga > 8) {
        setMensagem(`Capacidade excedida (${novaCarga}h)`)
        return prev
      }

      setMensagem("")

      return prev.map(o =>
        o.id === ordemId
          ? { ...o, dataEntrega: novaData, origem: "manual" }
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
        {datasSemana.map((data, index) => {
          const dateKey = toDateKey(data)

          const ordensDoDia = ordens.filter(
            o => o.dataEntrega === dateKey
          )

          console.log(`📦 Ordens ${dateKey}:`, ordensDoDia.length)

          return (
            <Column
              key={dateKey}
              dia={["SEG", "TER", "QUA", "QUI", "SEX"][index]}
              data={data}
              droppableId={dateKey}
              ordens={ordensDoDia}
              modoTv={modoTv}
            />
          )
        })}
      </div>
    </DndContext>
  )
}











