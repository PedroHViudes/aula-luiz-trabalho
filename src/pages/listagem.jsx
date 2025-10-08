import { useState, useEffect } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Listagem() {
  const [tarefas, setTarefas] = useState(() => {
    const listaDeTarefasSalvas = localStorage.getItem('TAREFAS_CADASTRADAS');
    return listaDeTarefasSalvas ? JSON.parse(listaDeTarefasSalvas) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(tarefas));
  }, [tarefas]);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const listaParaExibir = tarefas.filter(tarefa => {
    return usuarioLogado && tarefa.criadoPor === usuarioLogado.nome;
  });


  const handleRedefinir = (tarefaRestaurada, indexOriginal) => {
  setTarefas((tarefasAtuais) => {
    const novaLista = [...tarefasAtuais];
    if (indexOriginal === -1 || indexOriginal > novaLista.length) {
      novaLista.push(tarefaRestaurada);
    } else {
      novaLista.splice(indexOriginal, 0, tarefaRestaurada);
    }
    return novaLista;
  });
};

  const handleDelete = (idTarefaParaExcluir) => {
    const tarefaExcluida = tarefas.find(tarefa => tarefa.id === idTarefaParaExcluir);
    const indexOriginal = tarefas.findIndex(tarefa => tarefa.id === idTarefaParaExcluir);
    const novaLista = tarefas.filter(tarefa => tarefa.id !== idTarefaParaExcluir);

    setTarefas(novaLista);

    toast.success(({ closeToast }) => (
      <div>
        Atividade excluída com sucesso!
        <button onClick={() => {
          handleRedefinir(tarefaExcluida, indexOriginal);
          closeToast();
        }}>
          Desfazer
        </button>
      </div>
    ));
  };

  const handleConcluir = (idTarefaParaConcluir) => {
    const novaLista = tarefas.map(tarefa => {
      if (tarefa.id === idTarefaParaConcluir) {
        return { ...tarefa, status: tarefa.status === "Concluída" ? "Pendente" : "Concluída" };
      }
      return tarefa;
    });
    setTarefas(novaLista);
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
                  {listaParaExibir.map((tarefa) => (
                    <tr key={tarefa.id} className={tarefa.status === "Concluída" ? "tarefa-concluida" : ""}>
                      <td>{tarefa.tituloatv}</td>
                      <td>{tarefa.descricao}</td>
                      <td>{tarefa.data}</td>
                      <td>{tarefa.prioridade}</td>
                      <td>
                        <span className="status-">{tarefa.status || "Pendente"}</span>
                      </td>
                      <td>{tarefa.criadoPor}</td>
                      <td className="acoes">
                        <button onClick={() => handleConcluir(tarefa.id)}>Concluir</button>
                        <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
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