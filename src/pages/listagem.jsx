import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";

export default function Listagem() {
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
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Título tarefa</td>
                    <td>Descrição tarefa</td>
                    <td>Data tarefa</td>
                    <td>prioridad</td>
                    <td>
                      <span className="status-">tarefa.status</span>
                    </td>
                    <td className="acoes">
                      <button>Concluir</button>
                      <button>Excluir</button>
                    </td>
                  </tr>
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
