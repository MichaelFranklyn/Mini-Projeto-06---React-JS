import './style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Servicos/api'

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nome: '', email: '', senha: '' })
    const [error, setError] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    function changeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function submitCadastro(e) {
        e.preventDefault()

        setError('')
        setErrorEmail('')

        try {
            if (!form.nome || !form.email || !form.senha) {
                setError('Por favor, preencha todos os campos!')
                return
            }

            const resposta = await api.post('/usuarios', {
                ...form
            })

            navigate('/')
        } catch (error) {
            setErrorEmail('Já existe usuário cadastrado com o e-mail informado.')
        }
    }

    function cancelarCadastro() {
        setForm({ nome: '', email: '', senha: '' })
        setError('')
        setErrorEmail('')
    }

    return (
        <div className='conteudo'>
            <div className='form-conteudo'>
                <form className='form form-cadastro' onSubmit={submitCadastro}>
                    <h2>Cadastre-se</h2>
                    <input type='text' name='nome' value={form.nome} placeholder='Nome' onChange={(e) => changeInput(e)} />
                    <input type='email' name='email' value={form.email} placeholder='E-mail' onChange={(e) => changeInput(e)} />
                    <input type='password' name='senha' value={form.senha} placeholder='Senha' onChange={(e) => changeInput(e)} />
                    <div className='botoes-form'>
                        <button type='submit' className='botao-verde'>Cadastrar</button>
                        <button type='button' className='botao-vermelho' onClick={() => cancelarCadastro()}>Cancelar</button>
                    </div>

                    <div className='erros'>
                        {error && <span className='error'>{error}</span>}
                        {errorEmail && <span className='error'>{errorEmail}</span>}
                    </div>

                    <p>Já tem cadastro? <a onClick={() => navigate('/')} >Clique aqui!</a></p>
                </form>
            </div>
            <div className='imagem-conteudo-cadastro'>
            </div>
        </div>
    );
}   