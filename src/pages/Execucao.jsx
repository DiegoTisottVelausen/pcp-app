import { useEffect, useState } from "react"
import { carregarPlanoAtual } from "../services/execucaoService"
import ExecucaoTable from "../components/execucao/ExecucaoTable"

export default function Execucao() {
  const [ops, setOps] = useState([])

  useEffect(() => {
  carregarPlanoAtual().then(ordens => {
    console.log("PLANO ATUAL:", ordens)
  })
}, [])


  return (
    <div>
      <h1>Execução</h1>
      <ExecucaoTable ops={ops} />
    </div>
  )
}
