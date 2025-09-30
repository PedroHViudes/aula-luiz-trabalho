import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Listagem from "./pages/listagem";
import CadastroAtividade from './pages/cadastro_atividade'
import Home from './pages/home'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/cadastrarAtividade" element={<CadastroAtividade />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
