import './style.css'
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom';
import api from '../../Servicos/api'
import UserContext from '../../Contexto/userContext';
import ListaContatos from '../../Componentes/ListaContatos';
import AdicionarContato from '../../Componentes/Adicionar';
import EditarContato from '../../Componentes/Editar';
import ExcluirContato from '../../Componentes/Excluir';
import iconeSaida from '../../assets/iconeSaida.svg'

export default function Contatos() {
    const navigate = useNavigate();
    const [listaContatos, setListaContatos] = useState([])
    const [modalAdicionar, setModalAdicionar] = useState(false)
    const [modalEditar, setModalEditar] = useState(false)
    const [modalExcluir, setModalExcluir] = useState(false)
    const [tokenUsuario, setTokenUsuario, removeToken] = useLocalStorage('tokenUsuario');
    const [usuario, setUsuario, removeUsuario] = useLocalStorage('usuario', '');
    const [email, setEmail, removeEmail] = useLocalStorage('email', '');

    useEffect(() => {
        carregarLista()
    }, [])

    async function carregarLista() {
        try {
            const resposta = await api.get('/contatos', {
                headers: {
                    Authorization: `Bearer ${tokenUsuario}`
                }
            })

            setListaContatos(resposta.data)
        } catch (error) {
            console.log(error)
        }
    }

    function sairConta() {
        removeToken()
        removeEmail()
        removeUsuario()
        navigate('/')
    }

    return (
        <UserContext.Provider value={{ setModalAdicionar, carregarLista, tokenUsuario, setModalEditar, setModalExcluir }}>
            <div className='contatos'>
                <header>
                    <h1>CONTATOS</h1>
                    <img src={iconeSaida} onClick={() => sairConta()} />
                </header>

                <main>
                    <button onClick={() => setModalAdicionar(true)}>Adicionar</button>
                    <div className='cabecalho-lista'>
                        <h1>Nome</h1>
                        <h1>Email</h1>
                        <h1>Telefone</h1>
                        <div className='vazia'>
                        </div>
                    </div>
                    <div className='lista-contatos'>
                        {listaContatos.map((contato) => (
                            <ListaContatos
                                key={contato.id}
                                contato={contato}
                            />
                        ))}
                    </div>
                </main>
            </div>

            {modalAdicionar && <AdicionarContato />}
            {modalEditar && <EditarContato />}
            {modalExcluir && <ExcluirContato />}
        </UserContext.Provider>
    );
}       