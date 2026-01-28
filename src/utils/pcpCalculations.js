export function calcularHorasTotais(ordens) {
  return ordens.reduce((soma, ordem) => soma + ordem.tempo, 0)
}

export function calcularCapacidadePercentual(ordens) {
  const capacidadeDiaria = 8
  const diasSemana = 5

  const capacidadeTotal = capacidadeDiaria * diasSemana
  const horasTotais = calcularHorasTotais(ordens)

  return (horasTotais / capacidadeTotal) * 100
}

export function estaAtrasada(ordem) {
  const hoje = new Date()
  const entrega = new Date(ordem.dataEntrega)

  hoje.setHours(0, 0, 0, 0)
  entrega.setHours(0, 0, 0, 0)

  return entrega < hoje
}

export function diasDeAtraso(ordem) {
  const hoje = new Date()
  const entrega = new Date(ordem.dataEntrega)

  hoje.setHours(0, 0, 0, 0)
  entrega.setHours(0, 0, 0, 0)

  const diffMs = hoje - entrega
  const diffDias = diffMs / (1000 * 60 * 60 * 24)

  return diffDias > 0 ? Math.floor(diffDias) : 0
}

export function nivelDeAtraso(ordem) {
  const dias = diasDeAtraso(ordem)

  if (dias >= 6) return "critico"
  if (dias >= 3) return "medio"
  if (dias >= 1) return "leve"

  return "ok"
}

export function contarAtrasadas(ordens) {
  return ordens.filter(ordem => estaAtrasada(ordem)).length
}

export function ordenarPorPrioridade(ordens) {
  const pesoNivel = {
    critico: 3,
    medio: 2,
    leve: 1,
    ok: 0
  }

  return [...ordens].sort((a, b) => {
    const nivelA = nivelDeAtraso(a)
    const nivelB = nivelDeAtraso(b)

    // 1️⃣ prioridade por nível
    if (pesoNivel[nivelA] !== pesoNivel[nivelB]) {
      return pesoNivel[nivelB] - pesoNivel[nivelA]
    }

    // 2️⃣ prioridade por dias de atraso
    return diasDeAtraso(b) - diasDeAtraso(a)
  })
}

export function contarAtrasoCritico(ordens) {
  return ordens.filter(
    ordem => nivelDeAtraso(ordem) === "critico"
  ).length
}
