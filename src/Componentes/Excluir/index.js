import './style.css'
import { useContext } from 'react';
import { useLocalStorage } from 'react-use'
import api from '../../Servicos/api'
import UserContext from '../../Contexto/userContext';
import IconeFechar from '../../assets/iconeFechar.svg'

export default function ExcluirContato() {
    const [contatoUsuario, setContatoUsuario, removeContato] = useLocalStorage('Contatousuario');
    const { setModalExcluir, tokenUsuario, carregarLista } = useContext(UserContext)

    async function excluirContato() {
        try {
            const resposta = await api.delete(`contatos/${contatoUsuario.id}`, {
                headers: {
                    'Authorization': `Bearer ${tokenUsuario}`
                }
            })

            carregarLista()
            setModalExcluir(false)
        } catch (error) {
            console.log(error)
        }
    }

    function cancelarExcluir() {
        setModalExcluir(false)
    }

    return (
        <div className='modal'>
            <div className='conteudo-excluir'>
                <img src={IconeFechar} onClick={() => setModalExcluir(false)} />
                <h1>Confirma a exclusão?</h1>
                <p>Deseja excluir o contato, Daniel Lopes?</p>

                <div className='botoes-excluir'>
                    <button className='botao-verde-excluir' onClick={() => excluirContato()}>EXCLUIR</button>
                    <button className='botao-vermelho-excluir' onClick={() => cancelarExcluir()}>CANCELAR</button>
                </div>

            </div>
        </div>
    );
}       