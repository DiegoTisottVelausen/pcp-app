import { useEffect, useState } from "react"
import { carregarHistoricoPcp } from "../services/pcpService"
import HistoricoTable from "../components/historico/HistoricoTable"

export default function HistoricoPcp() {
  const [planos, setPlanos] = useState([])

  useEffect(() => {
    carregarHistoricoPcp().then(setPlanos)
  }, [])

  return (
    <div>
      <h1>Histórico de PCP</h1>
      <HistoricoTable planos={planos} />
    </div>
  )
}
