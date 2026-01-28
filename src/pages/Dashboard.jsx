import { useEffect, useState } from "react"
import { carregarPcp, salvarPcp } from "../services/pcpService"
import KpiRow from "../components/kpi/KpiRow"
import Board from "../components/board/Board"
import { pcpData } from "../data/pcpFakeData"
import { calcularCapacidadePercentual, contarAtrasadas, contarAtrasoCritico } from "../utils/pcpCalculations"

export default function Dashboard() {
  const [ordens, setOrdens] = useState([])
  const [mensagem, setMensagem] = useState("")

  const capacidadePercentual =
    calcularCapacidadePercentual(ordens)

    const atrasadas = contarAtrasadas(ordens)
    const criticas = contarAtrasoCritico(ordens)

    useEffect(() => {
        carregarPcp().then(dados => {
            if (dados.length === 0) {
            setOrdens(pcpData)
            salvarPcp(pcpData)
            } else {
            setOrdens(dados)
            }
    })
    }, [])

    useEffect(() => 
        {
            if (ordens.length > 0) {
                salvarPcp(ordens)
            }
        }, [ordens])


  return (
    <div>
      <KpiRow capacidade={capacidadePercentual} atrasadas={atrasadas} criticas={criticas}/>

      {mensagem && (
        <div
          style={{
            background: "#2b1a1a",
            color: "#ffb3b3",
            padding: 8,
            borderRadius: 6,
            marginBottom: 12
          }}
        >
          {mensagem}
        </div>
      )}

      <Board
        ordens={ordens}
        setOrdens={setOrdens}
        setMensagem={setMensagem}
      />
    </div>
  )
}
