import { useEffect, useState } from "react"
import { carregarOrdensErp, carregarPcp, salvarPcp } from "../services/pcpService"
import { calcularCapacidadePercentual, contarAtrasadas, contarAtrasoCritico, capacidadePorDia, capacidadePorMaquinaEDia } from "../utils/pcpCalculations"
import Board from "../components/board/Board"
import KpiRow from "../components/kpi/KpiRow"

export default function Dashboard() {
  
  const [ordensOriginais, setOrdensOriginais] = useState([])
  const [ordens, setOrdens] = useState([])
  const [mensagem, setMensagem] = useState("")
  const [dataBaseSemana, setDataBaseSemana] = useState("2026-02-02")
  const capacidadeDia = capacidadePorDia(ordens)
  const capacidadeMaquina = capacidadePorMaquinaEDia(ordens)
  const existeSimulacao = ordens.some(o => o.origem === "simulado")
 
  function descartarSimulacao() {
    setOrdens(ordensOriginais)
  }


  async function confirmarSimulacao() {
    const confirmadas = ordens.map(o =>
      o.origem === "simulado"
        ? { ...o, origem: "pcp" }
        : o
    )

    await salvarPcp(confirmadas)

    setOrdens(confirmadas)
    setOrdensOriginais(confirmadas)
  }



  useEffect(() => {
  async function init() {
    try {
      const erp = await carregarOrdensErp()
      const pcp = await carregarPcp()

      const erpFormatado = erp.map(o => ({
        id: o.ordem_id,
        produto: o.produto,
        operacao: o.operacao,
        maquina: o.maquina,
        tempo: o.tempo,
        dataEntrega: o.data,
        origem: "erp"
      }))

      if (pcp.length > 0) {
        setOrdens(pcp)
        setOrdensOriginais(pcp)
      } else {
        setOrdens(erpFormatado)
        setOrdensOriginais(erpFormatado)
      }

    } catch (erro) {
      console.error("Erro ao carregar dados:", erro)
      setMensagem("Erro ao conectar com backend")
    }
  }

  init()
}, [])



  useEffect(() => {
    if (ordens.length) salvarPcp(ordens)
  }, [ordens])

  return (
    <div style={{ padding: 24 }}>
      <h1>PCP</h1>

      {existeSimulacao && (
        <div className="simulacao-actions">
          <button onClick={confirmarSimulacao}>
            Confirmar simulação
          </button>

          <button onClick={descartarSimulacao}>
            Descartar simulação
          </button>
        </div>
      )}


      <KpiRow
        capacidade={calcularCapacidadePercentual(ordens)}
        atrasadas={contarAtrasadas(ordens)}
        criticas={contarAtrasoCritico(ordens)}
        ajustesManuais={ordens.filter(o => o.origem === "manual").length}
        horasTotais={ordens.reduce((s, o) => s + o.tempo, 0)}
      />

      {mensagem && <p>{mensagem}</p>}

      <Board
        ordens={ordens}
        setOrdens={setOrdens}
        onDragEnd={(novas) => setOrdens(novas)}
      />

    </div>
  )
}

