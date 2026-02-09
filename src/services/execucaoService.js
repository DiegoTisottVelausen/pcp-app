export async function carregarPlanoAtual() {
  const res = await fetch("http://localhost:10000/pcp")
  return res.json()
}
