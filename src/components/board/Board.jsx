import { DndContext } from "@dnd-kit/core"
import Column from "./Column"

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"]

export default function Board({ ordens, setOrdens, setMensagem, modoTv, dataBaseSemana }) {
  
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
  let novoDia = over.id
  // se soltou em cima de um CARD, pega a coluna dele
  if (!["SEG", "TER", "QUA", "QUI", "SEX"].includes(novoDia)) {
    const ordemSobreposta = ordens.find(o => o.id === novoDia)
    if (!ordemSobreposta) return
    novoDia = diaDaSemana(ordemSobreposta.dataEntrega)
  }
  const capacidadeMaxima = 8

  setOrdens(prev => {
  const ordemMovida = prev.find(o => o.id === ordemId)
  if (!ordemMovida) return prev

  // 1) calcular segunda-feira da semana atual exibida
  const base = new Date(dataBaseSemana)
  const diaSemana = base.getDay()
  const diffParaSegunda = (diaSemana === 0 ? -6 : 1 - diaSemana)

  const segunda = new Date(base)
  segunda.setDate(base.getDate() + diffParaSegunda)
  segunda.setHours(0, 0, 0, 0)

  // 2) mapa de colunas -> deslocamento em dias
  const mapaDias = {
    SEG: 0,
    TER: 1,
    QUA: 2,
    QUI: 3,
    SEX: 4
  }

  const deslocamento = mapaDias[novoDia] ?? 0

  // 3) data real de destino
  const novaData = new Date(segunda)
  novaData.setDate(segunda.getDate() + deslocamento)
  const novaDataIso = novaData.toISOString().slice(0, 10)

  // 4) soma das horas já existentes nessa data
  const horasNoDestino = prev
    .filter(o =>
      o.id !== ordemId &&
      o.dataEntrega === novaDataIso
    )
    .reduce((soma, o) => soma + o.tempo, 0)

  const capacidadeMaxima = 8
  const novaCarga = horasNoDestino + ordemMovida.tempo

  // 🚫 bloqueio de capacidade
  if (novaCarga > capacidadeMaxima) {
    setMensagem(
      `Não é possível mover: ${novoDia} ficaria com ${novaCarga.toFixed(1)}h (limite ${capacidadeMaxima}h).`
    )
    return prev
  }

  // ✅ move a ordem
  setMensagem("")
  return prev.map(ordem => {
    if (ordem.id !== ordemId) return ordem

    return {
      ...ordem,      
      dataEntrega: novaDataIso,
      origem: "manual"
    }
  })
})
  }

//----------------------------------------------------------//
//----------------------------------------------------------//

// calcula segunda-feira da semana atual
const base = new Date(dataBaseSemana)
const dia = base.getDay()
const diffParaSegunda = (dia === 0 ? -6 : 1 - dia)

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



