const API_URL = "http://localhost:10000"

export async function carregarOrdensErp() {
  const res = await fetch(`${API_URL}/erp`)
  return res.json()
}

export async function carregarPcp() {
  const res = await fetch(`${API_URL}/pcp`)
  return res.json()
}

export async function salvarPcp(ordens) {
  await fetch(`${API_URL}/pcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      versao: new Date().toISOString(),
      origem: "simulacao",
      ordens
    })
  })
}

export async function carregarHistoricoPcp() {
  const res = await fetch("http://localhost:10000/pcp/versoes")
  return res.json()
}

