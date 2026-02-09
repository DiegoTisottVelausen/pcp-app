import { useEffect, useState } from "react"

import {
  carregarOrdensErp,
  carregarPcp,
  salvarPcp
} from "../services/pcpService"

import {
  calcularCapacidadePercentual,
  contarAtrasadas,
  contarAtrasoCritico
} from "../utils/pcpCalculations"

import Board from "../components/board/Board"
import KpiRow from "../components/kpi/KpiRow"

export default function Dashboard() {

  const [ordensOriginais, setOrdensOriginais] = useState([])
  const [ordens, setOrdens] = useState([])
  const [mensagem, setMensagem] = useState("")
  const [dataBaseSemana, setDataBaseSemana] = useState("2026-02-02")

  const existeSimulacao = ordens.some(o => o.origem === "simulado")

  // 🔵 DRAG — (próximo passo vamos recalcular capacidade aqui)
  function onDragEnd(result) {
    if (!result.destination) return

    const { draggableId, destination } = result

    const novasOrdens = ordens.map(o => {
      if (o.id === draggableId) {
        return {
          ...o,
          data: destination.droppableId,
          origem: "simulado"
        }
      }
      return o
    })

    setOrdens(novasOrdens)
  }

  // 🔴 DESCARTAR SIMULAÇÃO
  function descartarSimulacao() {
    setOrdens(ordensOriginais)
  }

  // 🟢 CONFIRMAR SIMULAÇÃO
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

  // 🚀 INIT
  useEffect(() => {
    async function init() {
      try {
        const erp = await carregarOrdensErp()
        const pcp = await carregarPcp()

        // 🔄 Formata ERP → padrão do Board
        const erpFormatado = erp.map(o => ({
          id: o.ordem_id,
          produto: o.produto,
          operacao: o.operacao,
          maquina: o.maquina,
          tempo: o.tempo,
          data: o.data,
          origem: "erp"
        }))

        if (pcp.length > 0) {
          setOrdens(pcp)
          setOrdensOriginais(pcp)
        } else {
          setOrdens(erpFormatado)
          setOrdensOriginais(erpFormatado)
        }

      } catch (err) {
        console.error("Erro ao conectar backend", err)
        setMensagem("Erro ao conectar com backend")
      }
    }

    init()
  }, [])

  // 💾 Autosave
  useEffect(() => {
    if (ordens.length) {
      salvarPcp(ordens)
    }
  }, [ordens])

  return (
    <div style={{ padding: 24 }}>
      <h1>PCP</h1>

      {/* 🔵 AÇÕES SIMULAÇÃO */}
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

      {/* 📊 KPIs */}
      <KpiRow
        capacidade={calcularCapacidadePercentual(ordens)}
        atrasadas={contarAtrasadas(ordens)}
        criticas={contarAtrasoCritico(ordens)}
        ajustesManuais={ordens.filter(o => o.origem === "manual").length}
        horasTotais={ordens.reduce((s, o) => s + o.tempo, 0)}
      />

      {mensagem && <p>{mensagem}</p>}

      {/* 🧱 BOARD */}
      <Board
        ordens={ordens}
        setOrdens={setOrdens}
        onDragEnd={onDragEnd}
        dataBaseSemana={dataBaseSemana}
      />
    </div>
  )
}
