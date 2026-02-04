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
  const [ordens, setOrdens] = useState([])
  const [mensagem, setMensagem] = useState("")
  const [dataBaseSemana, setDataBaseSemana] = useState("2026-02-02")

  useEffect(() => {
    async function init() {
      const erp = await carregarOrdensErp()
      const pcp = await carregarPcp()

      if (pcp.length > 0) {
        setOrdens(pcp)
      } else {
        setOrdens(
          erp.map(o => ({
            id: o.id,
            produto: o.produto,
            operacao: o.operacao,
            tempo: o.horas,
            dataEntrega: o.dataEntrega,
            origem: "erp"
          }))
        )
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
        setMensagem={setMensagem}
        dataBaseSemana={dataBaseSemana}
      />
    </div>
  )
}

