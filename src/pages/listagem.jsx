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
  }, []); 





  const handleDelete = (indexDelete) => {
      const temCerteza = confirm("Tem certeza que deseja excluir esta atividade?");

    
    if (temCerteza) {
        setTarefas(tarefas.filter((tarefa, index) => index !== indexDelete));
        localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(tarefas.filter((tarefa, index) => index !== indexDelete)));
    }
};

const handleConcluir = (indexConcluir) => {
    const certeza = confirm("Tem certeza que deseja marcar esta atividade como concluída?");

    if (certeza) {
        
        const listaAtualizada = tarefas.map((tarefa, index) => {
            
            if (index === indexConcluir) {
               
                return { ...tarefa, status: "Concluída" };
                
            }
            
            return tarefa;
        });

        setTarefas(listaAtualizada);
        localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(listaAtualizada));
    }
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
                  {tarefas.map((tarefa, index) => (
                    <tr key={index} className={tarefa.status === "Concluída" ? "tarefa-concluida" : "" }>
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
    </>
  );
}