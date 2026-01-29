import { useEffect, useState } from "react"
import { carregarPcp, salvarPcp, carregarOrdensErp } from "../services/pcpService"
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
const [modoTv, setModoTv] = useState(false)

    useEffect(() => {
      carregarOrdensErp()
        .then(dados => {
          console.log("Dados vindos do ERP:", dados)
        })
        .catch(erro => {
          console.error("Erro ao buscar ERP:", erro)
        })
    }, [])



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


    useEffect(() => 
      {
        if (!modoTv) return

      const intervalo = setInterval(() => 
        {
          carregarPcp().then(setOrdens)
        }, 30000) // 30s

      return () => clearInterval(intervalo)
      }, [modoTv])


  return (
    
    <div 
      style=
        {{
          padding: modoTv ? "32px 48px" : "24px 32px",
          fontSize: modoTv ? 18 : 14
        }}
    >

          <h1 style={{ fontSize: modoTv ? 36 : 28 }}>PCP</h1>

          <KpiRow
            capacidade={capacidadePercentual}
            atrasadas={atrasadas}
            criticas={criticas}
            modoTv={modoTv}
          />

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

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <strong>{modoTv ? "Modo TV / Chão de Fábrica" : "Modo Normal"}</strong>

            <button
              onClick={() => setModoTv(prev => !prev)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #444",
                cursor: "pointer"
              }}
            >
              {modoTv ? "Sair do Modo TV" : "Ativar Modo TV"}
            </button>
          </div>

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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: modoTv ? 26 : 20, margin: "24px 0 12px" }}>
              Programação Semanal
            </h2>

            <button
              onClick={() => window.print()}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border: "1px solid #444",
                background: "#f0f0f0",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Imprimir / PDF
            </button>
          </div>

          <Board
            ordens={ordensFiltradas}
            setOrdens={setOrdens}
            setMensagem={setMensagem}
            modoTv={modoTv}
          />

    </div>
  )
}
