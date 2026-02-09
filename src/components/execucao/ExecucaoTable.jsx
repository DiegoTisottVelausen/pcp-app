import ExecucaoStatusBadge from "./ExecucaoStatusBadge"

export default function ExecucaoTable({ ops }) {
  return (
    <table>
      <thead>
        <tr>
          <th>OP</th>
          <th>Produto</th>
          <th>Máquina</th>
          <th>Data</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {ops.map(op => (
          <tr key={op.id}>
            <td>{op.id}</td>
            <td>{op.produto}</td>
            <td>{op.maquina}</td>
            <td>{op.data}</td>
            <td>
              <ExecucaoStatusBadge status={op.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
