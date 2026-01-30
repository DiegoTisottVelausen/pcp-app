import KpiCard from "./KpiCard"

export default function KpiRow({ capacidade, atrasadas, criticas, ajustesManuais, modoTv }) {
  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 24
        }}
      >
      <KpiCard titulo="Pedidos Abertos" valor={0} />
      <KpiCard titulo="OPs em Produção" valor={0} />

      <KpiCard
        titulo="Atrasados"
        valor={atrasadas}
        modoTv={modoTv}
      />

      <KpiCard
        titulo="Atraso Crítico"
        valor={criticas}
        modoTv={modoTv}
      />

      <KpiCard
        titulo="Capacidade Utilizada"
        valor={`${capacidade.toFixed(0)}%`}
        modoTv={modoTv}
      />

      <KpiCard
        titulo="Ajustes manuais"
        valor={ajustesManuais}
        modoTv={modoTv}
      />

    </div>
  )
}



