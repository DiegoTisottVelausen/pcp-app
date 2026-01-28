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

