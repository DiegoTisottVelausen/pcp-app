import { DndContext } from "@dnd-kit/core"
import Column from "./Column"

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"]

export default function Board({ ordens, setOrdens, setMensagem }) {
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
    return prev.map(ordem =>
      ordem.id === ordemId
        ? { ...ordem, dia: novoDia }
        : ordem
    )
  })
}



  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Programação Semanal</h3>

      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16
          }}
        >

          {dias.map(dia => (
            <Column
              key={dia}
              dia={dia}
              ordens={ordens.filter(o => o.dia === dia)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}



