import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { USUARIOLOGADO, USUARIOSCADASTRADOS } from "../utils/constantes";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate();

    function autenticar(e) {
        e.preventDefault();
        if (email == '' || senha == '') {
            toast.error("Usuário/Senha obrigatórios")
            return;
        }

        const dadosLocalStorage = window.localStorage.getItem(USUARIOSCADASTRADOS);

        if (dadosLocalStorage == null) {
            toast.error('Não existe esse usuário/senha');
        }
        else {
            const cadastrados = JSON.parse(dadosLocalStorage);

            for (let index = 0; index < cadastrados.length; index++) {
                const usuario = cadastrados[index];
                if (usuario.email == email && usuario.senha == senha) {
                    sessionStorage.setItem(USUARIOLOGADO, email)
                    navigate("home");
                }
            }
            toast.error('Não existe esse usuário/senha');
        }


    }
    return (
        <div id="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Login</h1>
                    <p>Entre com suas credenciais para acessar o sistema</p>
                </div>
                <form id="login-form" onSubmit={autenticar}>
                    <div className="form-group">
                        <label htmlFor="login-email">E-mail</label>
                        <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Senha</label>
                        <input type="password" id="login-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <button type="submit">Entrar</button>
                    <p>
                        Não tem uma conta?{" "}
                        <Link to="/cadastro">Cadastre-se aqui</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}