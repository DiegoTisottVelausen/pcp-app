const API = "http://localhost:3001"

export async function carregarPcp() {
  const res = await fetch(`${API}/pcp`)
  return res.json()
}

export async function salvarPcp(ordens) {
  await fetch(`${API}/pcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ordens)
  })
}

export async function carregarOrdensErp() {
  const res = await fetch(`${API}/erp/ordens`)
  return res.json()
}

