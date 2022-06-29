import { useState, useContext } from 'react';
import { useLocalStorage } from 'react-use'
import api from '../../Servicos/api'
import UserContext from '../../Contexto/userContext';
import IconeFechar from '../../assets/iconeFechar.svg'

export default function EditarContato() {
    const { setModalEditar, tokenUsuario, carregarLista } = useContext(UserContext)
    const [error, setError] = useState('')
    const [contatoUsuario, setContatoUsuario, removeContato] = useLocalStorage('Contatousuario');
    const [form, setForm] = useState({ nome: contatoUsuario.nome, email: contatoUsuario.email, telefone: contatoUsuario.telefone })

    function changeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function submitEditarContato(e) {
        e.preventDefault()

        setError('')

        try {
            if (!form.nome || !form.email || !form.telefone) {
                setError('Por favor, preencha todos os campos!')
                return
            }

            const resposta = await api.put(`/contatos/${contatoUsuario.id}`, {
                ...form
            },
                {
                    headers: {
                        Authorization: `Bearer ${tokenUsuario}`
                    }
                })

            carregarLista()
            setModalEditar(false)
        } catch (error) {
            console.log(error)
        }
    }

    function limparCadastro() {
        setForm({ nome: contatoUsuario.nome, email: contatoUsuario.email, telefone: contatoUsuario.telefone })
    }

    return (
        <div className='modal'>
            <form className='conteudo-modal' onSubmit={submitEditarContato}>
                <img src={IconeFechar} onClick={() => setModalEditar(false)} />
                <h1>Editar Contato</h1>
                <input type='text' name='nome' value={form.nome} placeholder='Nome' onChange={(e) => changeInput(e)} />
                <input type='email' name='email' value={form.email} placeholder='E-mail' onChange={(e) => changeInput(e)} />
                <input type='number' name='telefone' value={form.telefone} placeholder='Telefone' onChange={(e) => changeInput(e)} />

                <div className='erros-modal'>
                    {error && <span className='error'>{error}</span>}
                </div>

                <div className='modal-botoes'>
                    <button type='submit' className='botao-verde-modal'>SALVAR</button>
                    <button type='button' className='botao-vermelho-modal' onClick={() => limparCadastro()}>CANCELAR</button>
                </div>
            </form>
        </div>
    );
}       