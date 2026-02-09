export default function ExecucaoStatusBadge({ status }) {
  const mapa = {
    planejado: { label: "Planejado", color: "#999" },
    em_producao: { label: "Em Produção", color: "#f0ad4e" },
    concluido: { label: "Concluído", color: "#5cb85c" }
  }

  const { label, color } = mapa[status] ?? mapa.planejado

  return (
    <span
      style={{
        background: color,
        color: "#000",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 12
      }}
    >
      {label}
    </span>
  )
}
