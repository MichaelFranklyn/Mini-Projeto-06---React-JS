import './style.css'
import { useContext } from 'react';
import { useLocalStorage } from 'react-use'
import UserContext from '../../Contexto/userContext';
import Lapis from '../../assets/lapis.svg'
import Lixeira from '../../assets/lixeira.svg'

export default function ListaContatos({ contato }) {
    const { setModalEditar, setModalExcluir } = useContext(UserContext)
    const [contatoUsuario, setContatoUsuario, removeContato] = useLocalStorage('Contatousuario');

    function abrirModalEditar() {
        setModalEditar(true)
        setContatoUsuario(contato)
    }

    function abrirModalExcluir () {
        setModalExcluir(true)
        setContatoUsuario(contato)
    }

    return (
        <div className='conteudo-lista'>
            <span>{contato.nome}</span>
            <span>{contato.email}</span>
            <span>{contato.telefone}</span>

            <div className='icones-lista'>
                <img src={Lapis} className='lapis' onClick={() => abrirModalEditar()} />
                <img src={Lixeira} className='lixeira' onClick={() => abrirModalExcluir()} />
            </div>
        </div>
    );
}       