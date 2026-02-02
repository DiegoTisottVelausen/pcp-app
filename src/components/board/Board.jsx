import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

export default function Board({
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
}) {

  // ===============================
  // calcula segunda-feira da semana
  // ===============================
  const base = new Date(dataBaseSemana)
  const diaSemana = base.getDay()
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)
  segunda.setHours(0, 0, 0, 0)

  // SEG → SEX (datas ISO)
  const datasSemana = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(segunda)
    d.setDate(segunda.getDate() + i)
    return d.toISOString().slice(0, 10) // 👈 CRÍTICO
  })

  // ===============================
  // DRAG END
  // ===============================
  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const ordemId = active.id
    const novaDataIso = over.id // yyyy-mm-dd

    setOrdens(prev => {
      const ordemMovida = prev.find(o => o.id === ordemId)
      if (!ordemMovida) return prev

      const capacidadeMaxima = 8

      const horasNoDestino = prev
        .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
        .reduce((soma, o) => soma + o.tempo, 0)

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

  return (
    <div style={{ marginBottom: 32 }}>
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
      >
        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div
            style={{
              display: "flex",
              gap: 16,
              minWidth: 900
            }}
          >
            {datasSemana.map((dataIso, index) => {
              const rotulos = ["SEG", "TER", "QUA", "QUI", "SEX"]

              return (
                <Column
                  key={dataIso}
                  dia={rotulos[index]}
                  dataIso={dataIso}
                  droppableId={dataIso}
                  ordens={ordens.filter(o => o.dataEntrega === dataIso)}
                  modoTv={modoTv}
                />
              )
            })}
          </div>
        </div>
      </DndContext>
    </div>
  )
}







