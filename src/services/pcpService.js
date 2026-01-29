const API_URL = "https://pcp-app-backend.onrender.com/pcp"

export async function carregarPcp() {
  const res = await fetch(API_URL)
  return res.json()
}

export async function salvarPcp(ordens) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ordens)
  })
}

export async function carregarOrdensErp() {
  const res = await fetch("https://pcp-app-backend.onrender.com/erp/ordens")

  if (!res.ok) {
    throw new Error("Erro ao buscar ordens do ERP")
  }

  const dados = await res.json()
  return dados
}

export async function buscarOrdensDoErp() {
  const resposta = await fetch("https://pcp-app-backend.onrender.com/erp/ordens")
  const dados = await resposta.json()
  return dados
}
