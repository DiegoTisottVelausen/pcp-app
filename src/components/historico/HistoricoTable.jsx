export default function HistoricoTable({ planos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Versão</th>
          <th>Data</th>
          <th>Usuário</th>
          <th>Origem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {planos.map(p => (
          <tr key={p.id}>
            <td>{p.versao}</td>
            <td>{new Date(p.dataCriacao).toLocaleString()}</td>
            <td>{p.usuario}</td>
            <td>{p.origem}</td>
            <td>
              <button>Visualizar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
