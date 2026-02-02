import { DndContext, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

function formatarDataISO(d) {
  const ano = d.getFullYear()
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${ano}-${mes}-${dia}`
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

      if (horasNoDestino + ordemMovida.tempo > capacidadeMaxima) {
        setMensagem("Capacidade excedida")
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

  // segunda-feira local (sem UTC)
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

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {datasSemana.map((data, index) => (
          <Column
            key={index}
            dia={["SEG","TER","QUA","QUI","SEX"][index]}
            data={data}
            droppableId={formatarDataISO(data)}
            ordens={ordens.filter(o => o.dataEntrega === formatarDataISO(data))}
            modoTv={modoTv}
          />
        ))}
      </div>
    </DndContext>
  )
}






