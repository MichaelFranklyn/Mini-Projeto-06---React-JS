import './style.css'
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom';
import api from '../../Servicos/api'

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', senha: '' })
    const [error, setError] = useState('')
    const [errorUsuario, setErrorUsuario] = useState(false)
    const [usuario, setUsuario, removeUsuario] = useLocalStorage('usuario', '');
    const [email, setEmail, removeEmail] = useLocalStorage('email', '');
    const [tokenUsuario, setTokenUsuario, removeToken] = useLocalStorage('tokenUsuario', '');

    useEffect(() => {
        if (tokenUsuario) {
            navigate('/contatos')
        }
    }, [])

    function changeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function submitLogin(e) {
        e.preventDefault()

        setError('')
        setErrorUsuario('')

        try {
            if (!form.email || !form.senha) {
                setError('Por favor, preencha todos os campos!')
                return
            }

            const resposta = await api.post('/login', {
                ...form
            })

            const { token, usuario } = resposta.data

            setUsuario(usuario.nome)
            setTokenUsuario(token)
            setEmail(usuario.email)

            navigate('/contatos')
        } catch (error) {
            setErrorUsuario('Usuário ou senha inválidos!')
        }
    }

    return (
        <div className='conteudo'>
            <div className='imagem-conteudo-login'>
            </div>
            <div className='form-conteudo'>
                <form className='form form-login' onSubmit={submitLogin}>
                    <h4>Bem vindo</h4>
                    <h1>Faça o login com sua conta</h1>
                    <input type='email' name='email' value={form.email} placeholder='E-mail' onChange={(e) => changeInput(e)} />
                    <input type='password' name='senha' value={form.senha} placeholder='Senha' onChange={(e) => changeInput(e)} />
                    <div className='botoes-form'>
                        <button className='botao-verde'>Login</button>
                    </div>

                    <div className='erros'>
                        {error && <span className='error'>{error}</span>}
                        {errorUsuario && <span className='error'>{errorUsuario}</span>}
                    </div>

                    <p>Não tem cadastro? <a onClick={() => navigate('/usuarios')}>Clique aqui!</a></p>
                </form>
            </div>
        </div>
    );
}   