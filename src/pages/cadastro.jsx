import { useState } from "react";
import Cabecalho from "../components/cabecalho";
import Rodape from "../components/rodape";
import { USUARIOSCADASTRADOS } from "../utils/constantes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    function alterarNome(e) {
        setNome(e.target.value)
    }

    function alterarEmail(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (senha != confirmarSenha) {
            toast.error("Senha e Confirmar Senha não são iguais");
            return;
        }

        if (!validarEmail()) {
            toast.error("Já existe um usuário com esse email!");
            return;
        }

        const usuario = {
            "nome": nome,
            "email": email,
            "senha": senha
        }
        let cadastrados = localStorage.getItem(USUARIOSCADASTRADOS) != null ? JSON.parse(localStorage.getItem(USUARIOSCADASTRADOS)) : [];

        cadastrados.push(usuario);
        localStorage.setItem(USUARIOSCADASTRADOS, JSON.stringify(cadastrados));
        
        toast.success("Cadastrado com sucesso!!", {
            closeButton: () => (<button onClick={() => navigate('/')}>Login</button>),
        })

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    }

    function validarEmail() {
        let usuarios = localStorage.getItem(USUARIOSCADASTRADOS);
        if (usuarios == null) {
            return true;
        }
        else {
            usuarios = JSON.parse(usuarios);
            for (let index = 0; index < usuarios.length; index++) {
                const usuario = usuarios[index];
                if (usuario.email == email) {
                    return false;
                }
            }
            return true;

            /*if (usuarios.find(usuario => usuario.email == email)) {
                return false;
            }
            else {
                return true;
            }
    
            return usuarios.find((usuario) => usuario.email == email) != undefined;*/
        }
    }
    return (<>
        <Cabecalho />
        <main>
            <div className="container">
                <div id="cadastro-page" className="page">
                    <div className="card">
                        <h1>Cadastro de Usuário</h1>
                        <form id="usuario-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome Completo</label>
                                <input type="text" id="nome" required value={nome} onChange={alterarNome} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" required value={email} onChange={alterarEmail} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="senha">Senha</label>
                                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} id="senha" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmar-senha">Confirmar Senha</label>
                                <input type="password" value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)} id="confirmar-senha" required />
                            </div>
                            <button type="submit">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        <Rodape />
        <ToastContainer />
    </>)
}