export function diaDaSemana(dataIso) {
  const dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
  const d = new Date(`${dataIso}T12:00:00`)
  return dias[d.getDay()]
}

export function estaAtrasada({ dataEntrega }) {
  const hoje = new Date()
  const data = new Date(`${dataEntrega}T12:00:00`)
  return data < hoje
}

export function diasDeAtraso({ dataEntrega }) {
  const hoje = new Date()
  const data = new Date(`${dataEntrega}T12:00:00`)
  const diff = hoje - data
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

export function nivelDeAtraso({ dataEntrega }) {
  const atraso = diasDeAtraso({ dataEntrega })
  if (atraso >= 5) return "critico"
  if (atraso >= 2) return "medio"
  if (atraso > 0) return "leve"
  return "ok"
}

export function ordenarPorPrioridade(ordens) {
  const peso = { critico: 3, medio: 2, leve: 1, ok: 0 }
  return [...ordens].sort(
    (a, b) =>
      peso[nivelDeAtraso({ dataEntrega: b.dataEntrega })] -
      peso[nivelDeAtraso({ dataEntrega: a.dataEntrega })]
  )
}

export function calcularCapacidadePercentual(ordens) {
  const horas = ordens.reduce((s, o) => s + o.tempo, 0)
  return (horas / 40) * 100
}

export function contarAtrasadas(ordens) {
  return ordens.filter(o => estaAtrasada({ dataEntrega: o.dataEntrega })).length
}

export function contarAtrasoCritico(ordens) {
  return ordens.filter(o => nivelDeAtraso({ dataEntrega: o.dataEntrega }) === "critico").length
}


