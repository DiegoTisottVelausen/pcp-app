import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import HistoricoPcp from "./pages/HistoricoPcp"
import Execucao from "./pages/Execucao"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/historico" element={<HistoricoPcp />} />
        <Route path="/execucao" element={<Execucao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
