import { useEffect, useState } from "react"
import { carregarPcp, salvarPcp } from "../services/pcpService"
import KpiRow from "../components/kpi/KpiRow"
import Board from "../components/board/Board"
import { pcpData } from "../data/pcpFakeData"
import { calcularCapacidadePercentual, contarAtrasadas, contarAtrasoCritico, estaAtrasada, nivelDeAtraso } from "../utils/pcpCalculations"

export default function Dashboard() {
    
  const [ordens, setOrdens] = useState([])
  const [mensagem, setMensagem] = useState("")
  const capacidadePercentual = calcularCapacidadePercentual(ordens)
  const atrasadas = contarAtrasadas(ordens)
  const criticas = contarAtrasoCritico(ordens)
  const [filtro, setFiltro] = useState("todos")
  const ordensFiltradas = ordens.filter(ordem => 
    {
      if (filtro === "atrasados") {
            return estaAtrasada(ordem)
          }

      if (filtro === "criticos") {
            return nivelDeAtraso(ordem) === "critico"
          }

          return true // todos
    })


    useEffect(() => {carregarPcp().then(dados => 
      {
            if (dados.length === 0) 
            {
              setOrdens(pcpData)
              salvarPcp(pcpData)
            } 
            else 
            {
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
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>PCP</h1>
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

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setFiltro("todos")}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: filtro === "todos" ? "2px solid #000" : "1px solid #ccc",
            background: filtro === "todos" ? "#eee" : "#fff",
            cursor: "pointer"
          }}
        >
          Todos
        </button>

        <button
          onClick={() => setFiltro("atrasados")}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: filtro === "atrasados" ? "2px solid #ff4d4d" : "1px solid #ccc",
            background: filtro === "atrasados" ? "#ffecec" : "#fff",
            cursor: "pointer"
          }}
        >
          Atrasados
        </button>

        <button
          onClick={() => setFiltro("criticos")}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: filtro === "criticos" ? "2px solid #d10000" : "1px solid #ccc",
            background: filtro === "criticos" ? "#ffd6d6" : "#fff",
            cursor: "pointer"
          }}
        >
          Críticos
        </button>
      </div>

      <h2 style={{ fontSize: 20, margin: "24px 0 12px" }}>
        Programação Semanal
      </h2>

      <Board
        ordens={ordensFiltradas}
        setOrdens={setOrdens}
        setMensagem={setMensagem}
      />


    </div>
  )
}
