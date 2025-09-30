import { useEffect } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";
import { USUARIOLOGADO } from "../utils/constantes";
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {
    if (sessionStorage.getItem(USUARIOLOGADO) == null) {
        return <Navigate to="/" />
    }

    return (<><Cabecalho />

        <main>
            <div className="container">
                <div id="home-page" className="page active">
                    <div className="card">
                        <h1>Bem-vindo ao Sistema de Gerenciamento de Tarefas</h1>
                        <p>Este sistema permite que você:</p>
                        <ul>
                            <li>Cadastre novos usuários</li>
                            <li>Faça login no sistema</li>
                            <li>Cadastre atividades e tarefas</li>
                            <li>Visualize e gerencie suas tarefas</li>
                        </ul>
                        <p>
                            Use o menu de navegação para acessar as diferentes funcionalidades
                            do sistema.
                        </p>
                    </div>
                </div>
            </div>
        </main>
        <Rodape />
    </>)
}