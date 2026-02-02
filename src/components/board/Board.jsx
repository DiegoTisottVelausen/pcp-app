import { DndContext, closestCenter, pointerWithin } from "@dnd-kit/core"
import Column from "./Column"

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"]

export default function Board({   
  ordens,
  setOrdens,
  setMensagem,
  modoTv,
  dataBaseSemana
 }) {
  
  const largura = window.innerWidth

  let colunas = 5
  if (largura <= 1200) colunas = 3
  if (largura <= 768) colunas = 2

//----------------------------------------------------------//
//----------------------------------------------------------//
  
  function handleDragEnd(event) {
  const { active, over } = event
  if (!over) return

  const ordemId = active.id
  const novaDataIso = over.id

  if (!/^\d{4}-\d{2}-\d{2}$/.test(novaDataIso)) return

  const capacidadeMaxima = 8

  setOrdens(prev => {
    const ordemMovida = prev.find(o => o.id === ordemId)
    if (!ordemMovida) return prev

    const horasNoDestino = prev
      .filter(o => o.id !== ordemId && o.dataEntrega === novaDataIso)
      .reduce((soma, o) => soma + o.tempo, 0)

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



//----------------------------------------------------------//
//----------------------------------------------------------//

// calcula segunda-feira da semana atual
const base = new Date(dataBaseSemana)
const diaSemana = base.getDay()
const diffParaSegunda = (diaSemana === 0 ? -6 : 1 - diaSemana)

const segunda = new Date(base)
segunda.setDate(base.getDate() + diffParaSegunda)
segunda.setHours(0, 0, 0, 0)


// cria array com SEG..SEX
const datasSemana = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(segunda)
  d.setDate(segunda.getDate() + i)
  return d
})

//----------------------------------------------------------//
//----------------------------------------------------------//

  return (
    <div style={{ marginBottom: 32 }}>   

      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <div
          className="board-scroll"
          style={{
            overflowX: "auto",
            paddingBottom: 8
          }}
        >
          <div
            className="board-row"
            style={{
              display: "flex",
              gap: 16,
              minWidth: 900 // 👈 força espaço mínimo total
            }}
          >
            {datasSemana.map((data, index) => {
                const rotulos = ["SEG", "TER", "QUA", "QUI", "SEX"]

                return (
                  <Column
                    key={data.toISOString()}
                    dia={rotulos[index]}
                    data={data}
                    setOrdens={setOrdens}
                    droppableId={data.toISOString().slice(0, 10)} // 👈 ESSENCIAL
                    ordens={ordens.filter(o => {
                      const d = new Date(o.dataEntrega)
                      return (
                        d.getFullYear() === data.getFullYear() &&
                        d.getMonth() === data.getMonth() &&
                        d.getDate() === data.getDate()
                      )
                    })}
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



