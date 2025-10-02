import { useState } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { USUARIOLOGADO } from "../utils/constantes";

export default function CadastroAtividade() {

    const [tituloatv, setTituloAtv] = useState("");
    const [descricao, setDescricao] = useState("");
    const [datac, setDatac] = useState("");
    const [prioridade, setPrioridade] = useState("");

    function validarData(dataString) {

        const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;


        return regexData.test(dataString);
    }

    function handleSubmit(e) {
        e.preventDefault();


        if (!validarData(datac)) {
            toast.error("Por favor, insira uma data no formato DD/MM/AAAA.");
            return;
        }

        const novaTarefa = {
            "tituloatv": tituloatv,
            "descricao": descricao,
            "data": datac,
            "prioridade": prioridade
        };


        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

        if (usuarioLogado && usuarioLogado.nome) {
            novaTarefa.criadoPor = usuarioLogado.nome;
        } else {

        }

        let cadastroTarefas = localStorage.getItem('TAREFAS_CADASTRADAS') != null ? JSON.parse(localStorage.getItem('TAREFAS_CADASTRADAS')) : [];

        cadastroTarefas.push(novaTarefa);

        localStorage.setItem('TAREFAS_CADASTRADAS', JSON.stringify(cadastroTarefas));

        toast.success("Atividade cadastrada com sucesso!");

        setTituloAtv("");
        setDescricao("");
        setDatac("");
        setPrioridade("");
    }



    return (
        <>
            <Cabecalho />

            <main>
                <div className="container">
                    <div id="atividades-page" className="page">
                        <div className="card">
                            <h1>Cadastro de Atividades</h1>
                            <form id="atividade-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="titulo">Título da Atividade</label>
                                    <input type="text" id="titulo" value={tituloatv} onChange={(e) => setTituloAtv(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descricao">Descrição</label>
                                    <textarea id="descricao" required value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="data">Data de Conclusão</label>
                                    <input
                                        type="text"
                                        id="data"
                                        placeholder="DD/MM/AAAA"
                                        required
                                        value={datac}
                                        onChange={(e) => setDatac(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prioridade">Prioridade</label>
                                    <select id="prioridade" required value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                                        <option value="">Selecione</option>
                                        <option value="alta">Alta</option>
                                        <option value="media">Média</option>
                                        <option value="baixa">Baixa</option>
                                    </select>
                                </div>
                                <button type="submit" >
                                    Cadastrar Atividade
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />
            <ToastContainer />

        </>
    )
}