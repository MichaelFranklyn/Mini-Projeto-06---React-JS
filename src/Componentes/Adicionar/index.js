import { useState, useContext } from 'react';
import api from '../../Servicos/api'
import UserContext from '../../Contexto/userContext';
import IconeFechar from '../../assets/iconeFechar.svg'

export default function AdicionarContato() {
    const { setModalAdicionar, carregarLista, tokenUsuario } = useContext(UserContext)
    const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
    const [error, setError] = useState('')

    function changeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function submitCadastrarContato(e) {
        e.preventDefault()
        
        setError('')

        try {
            if (!form.nome || !form.email || !form.telefone) {
                setError('Por favor, preencha todos os campos!')
                return
            }

            const resposta = await api.post('/contatos', {
                ...form
            },
                {
                    headers: {
                        Authorization: `Bearer ${tokenUsuario}`
                    }
                })

            carregarLista()
            setModalAdicionar(false)
        } catch (error) {
            console.log(error)
        }
    }

    function limparCadastro() {
        setForm({ nome: '', email: '', telefone: '' })
    }

    return (
        <div className='modal'>
            <form className='conteudo-modal' onSubmit={submitCadastrarContato}>
                <img src={IconeFechar} onClick={() => setModalAdicionar(false)} />
                <h1>Novo Contato</h1>
                <input type='text' name='nome' value={form.nome} placeholder='Nome' onChange={(e) => changeInput(e)} />
                <input type='email' name='email' value={form.email} placeholder='E-mail' onChange={(e) => changeInput(e)} />
                <input type='number' name='telefone' value={form.telefone} placeholder='Telefone' onChange={(e) => changeInput(e)} />

                <div className='erros-modal'>
                    {error && <span className='error'>{error}</span>}
                </div>

                <div className='modal-botoes'>
                    <button type='submit' className='botao-verde-modal'>ADICIONAR</button>
                    <button type='button' className='botao-vermelho-modal'onClick={() => limparCadastro()} >LIMPAR</button>
                </div>
            </form>
        </div>
    );
}       