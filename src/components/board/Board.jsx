import { DndContext } from "@dnd-kit/core"
import Column from "./Column"

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"]

export default function Board({ ordens, setOrdens, setMensagem, modoTv, dataBaseSemana }) {
  
  const largura = window.innerWidth

  let colunas = 5
  if (largura <= 1200) colunas = 3
  if (largura <= 768) colunas = 2

  
  function handleDragEnd(event) {
  
  const { active, over } = event

  if (!over) return

  const ordemId = active.id
  const novoDia = over.id
  const capacidadeMaxima = 8

  setOrdens(prev => {
    const ordemMovida = prev.find(o => o.id === ordemId)
    if (!ordemMovida) return prev

    const horasNoDestino = prev
      .filter(o => o.dia === novoDia && o.id !== ordemId)
      .reduce((soma, o) => soma + o.tempo, 0)

    const novaCarga = horasNoDestino + ordemMovida.tempo

    // 🚫 BLOQUEIO
    if (novaCarga > capacidadeMaxima) {
      setMensagem(
        `Não é possível mover: ${novoDia} ficaria com ${novaCarga.toFixed(
          1
        )}h (limite ${capacidadeMaxima}h).`
      )
      return prev
    }

    // ✅ MOVE
    setMensagem("")
    return prev.map(ordem => {
      if (ordem.id !== ordemId) return ordem

      // segunda-feira da semana atualmente exibida
      const base = new Date(dataBaseSemana)
      const dia = base.getDay()
      const diffParaSegunda = (dia === 0 ? -6 : 1 - dia)

      const segunda = new Date(base)
      segunda.setDate(base.getDate() + diffParaSegunda)
      segunda.setHours(0, 0, 0, 0)

      // mapa de colunas
      const mapaDias = {
        SEG: 0,
        TER: 1,
        QUA: 2,
        QUI: 3,
        SEX: 4
      }

      const deslocamento = mapaDias[novoDia] ?? 0

      const novaData = new Date(segunda)
      novaData.setDate(segunda.getDate() + deslocamento)

      const novaDataIso = novaData.toISOString().slice(0, 10)

      return {
        ...ordem,
        dia: novoDia,
        dataEntrega: novaDataIso,
        origem: "manual"
      }
    })
  
  })
}

  return (
    <div style={{ marginBottom: 32 }}>   

      <DndContext onDragEnd={handleDragEnd}>
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
                    key={index}
                    dia={rotulos[index]}
                    data={data}
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



