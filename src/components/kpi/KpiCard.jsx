export default function KpiCard({ titulo, valor, modoTv }) {
  const numero = Number(valor)
  const alerta =
    (titulo === "Atraso Crítico" && numero > 0) ||
    (titulo === "Atrasados" && numero > 0) ||
    (titulo === "Capacidade Utilizada" && numero > 100)


  return (
    <div
      style={{
        padding: 16,
        border: `2px solid ${alerta ? "#ff4d4d" : "#444"}`,
        borderRadius: 8,
        minWidth: 160
      }}
    >
      <p style={{ margin: 0, fontSize: 14 }}>{titulo}</p>
      <strong
        style={{
          fontSize: modoTv ? 36 : 24,
          color: alerta ? "#ff4d4d" : "inherit"
        }}
      >
        {valor}
      </strong>
    </div>
  )
}

