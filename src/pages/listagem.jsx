import { useState } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Listagem() {
  const [tarefas, setTarefas] = useState([]);

  // A nova lógica é colocada aqui, antes do return
  const listaDeTarefasSalvas = localStorage.getItem('TAREFAS_CADASTRADAS');
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Cria uma lista filtrada para ser exibida
  const listaParaExibir = [];

  if (listaDeTarefasSalvas && usuarioLogado) {
    const tarefasCompletas = JSON.parse(listaDeTarefasSalvas);
    const tarefasDoUsuario = tarefasCompletas.filter(tarefa => {
      return tarefa.criadoPor === usuarioLogado.nome;
    });
    listaParaExibir.push(...tarefasDoUsuario);
  }


  // Funções de manipulação
  const handleUndo = (tarefaRestaurada, indexOriginal) => {
    const listaParaRestaurar = [...tarefas];
    listaParaRestaurar.splice(indexOriginal, 0, tarefaRestaurada);
    setTarefas(listaParaRestaurar);
    localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(listaParaRestaurar));
  };

  const handleDelete = (indexParaExcluir) => {
    const tarefaExcluida = tarefas[indexParaExcluir];
    const novaLista = tarefas.filter((tarefa, index) => index !== indexParaExcluir);

    setTarefas(novaLista);
    localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(novaLista));

    toast.success(({ closeToast }) => (
      <div>
        Atividade excluída com sucesso!
        <button onClick={() => {
          handleUndo(tarefaExcluida, indexParaExcluir);
          closeToast();
        }}>
          Desfazer
        </button>
      </div>
    ));
  };

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
                  {listaParaExibir.map((tarefa, index) => (
                    <tr key={index} className={tarefa.status === "Concluída" ? "tarefa-concluida" : ""}>
                      <td>{tarefa.tituloatv}</td>
                      <td>{tarefa.descricao}</td>
                      <td>{tarefa.data}</td>
                      <td>{tarefa.prioridade}</td>
                      <td>
                        <span className="status-">{tarefa.status || "Pendente"}</span>
                      </td>
                      <td>{tarefa.criadoPor}</td>
                      <td className="acoes">
                        <button onClick={() => handleConcluir(index)}>Concluir</button>
                        <button onClick={() => handleDelete(index)}>Excluir</button>
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
      <ToastContainer />
    </>
  );
}