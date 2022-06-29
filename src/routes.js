import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import Login from './Paginas/Login'
import Cadastro from './Paginas/Cadastro'
import Contatos from './Paginas/Contatos'

function ProtectedRoutes({ redirectTo }) {
    const [tokenUsuario, setTokenUsuario, removeToken] = useLocalStorage('tokenUsuario');
    return tokenUsuario ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRotas() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/usuarios" element={<Cadastro />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/contatos" element={<Contatos />} />
            </Route>
        </Routes>
    );
}