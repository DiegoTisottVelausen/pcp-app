// Detecta automaticamente ambiente
const API =
  import.meta.env.PROD
    ? "https://pcp-app-backend.onrender.com"
    : "http://localhost:3001"

export async function carregarPcp() {
  const res = await fetch(`${API}/pcp`)
  if (!res.ok) throw new Error("Erro ao carregar PCP")
  return res.json()
}

export async function salvarPcp(ordens) {
  const res = await fetch(`${API}/pcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ordens),
  })
  if (!res.ok) throw new Error("Erro ao salvar PCP")
}

export async function carregarOrdensErp() {
  const res = await fetch(`${API}/erp/ordens`)
  if (!res.ok) throw new Error("Erro ao carregar ERP")
  return res.json()
}

