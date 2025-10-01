import { useState, useEffect } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";

export default function Listagem() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const listaDeTarefasSalvas = localStorage.getItem('TAREFAS_CADASTRADAS');
    if (listaDeTarefasSalvas) {
      setTarefas(JSON.parse(listaDeTarefasSalvas));
    }
  }, []); // O array vazio [] faz com que o useEffect rode apenas uma vez, na primeira vez que a página é carregada.

  return (
    <>
      <Cabecalho />
      <main>
        <div className="container">
          <div id="tarefas-page" className="page">
            <div className="card">
              <h1>Listagem de Tarefas</h1>
              <table id="tabela-tarefas">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Criado por</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tarefas.map((tarefa, index) => (
                    <tr key={index}>
                      <td>{tarefa.tituloatv}</td>
                      <td>{tarefa.descricao}</td>
                      <td>{tarefa.data}</td>
                      <td>{tarefa.prioridade}</td>
                      <td>
                        <span className="status-">{tarefa.status || "Pendente"}</span>
                      </td>
                      <td>{tarefa.criadoPor}</td> 
                      <td className="acoes">
                        <button>Concluir</button>
                        <button>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Rodape />
    </>
  );
}