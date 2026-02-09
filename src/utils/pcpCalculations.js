export function diaDaSemana(dataIso) {
  const dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
  const d = new Date(`${dataIso}T12:00:00`)
  return dias[d.getDay()]
}

function dataSemHora(dataIso) {
  const d = new Date(`${dataIso}T00:00:00`)
  d.setHours(0, 0, 0, 0)
  return d
}


export function estaAtrasada({ dataEntrega }) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const data = dataSemHora(dataEntrega)

  return data < hoje
}


export function diasDeAtraso({ dataEntrega }) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const data = dataSemHora(dataEntrega)

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

export function capacidadePorDia(ordens, capacidadeDiaria = 8) {
  const mapa = {}

  for (const o of ordens) {
    if (!mapa[o.data]) {
      mapa[o.data] = {
        horas: 0,
        capacidade: capacidadeDiaria,
        percentual: 0,
        excesso: 0
      }
    }

    mapa[o.data].horas += o.tempo
  }

  for (const dia in mapa) {
    const h = mapa[dia].horas
    const cap = mapa[dia].capacidade

    mapa[dia].percentual = Math.round((h / cap) * 100)
    mapa[dia].excesso = Math.max(0, h - cap)
  }

  return mapa
}

export function capacidadePorMaquinaEDia(
  ordens,
  capacidadeDiariaPorMaquina = {}
) {
  const mapa = {}

  for (const o of ordens) {
    const capPadrao = capacidadeDiariaPorMaquina[o.maquina] ?? 8

    if (!mapa[o.data]) mapa[o.data] = {}
    if (!mapa[o.data][o.maquina]) {
      mapa[o.data][o.maquina] = {
        horas: 0,
        capacidade: capPadrao,
        percentual: 0,
        excesso: 0
      }
    }

    mapa[o.data][o.maquina].horas += o.tempo
  }

  for (const data in mapa) {
    for (const maq in mapa[data]) {
      const bloco = mapa[data][maq]
      bloco.percentual = Math.round((bloco.horas / bloco.capacidade) * 100)
      bloco.excesso = Math.max(0, bloco.horas - bloco.capacidade)
    }
  }

  return mapa
}

