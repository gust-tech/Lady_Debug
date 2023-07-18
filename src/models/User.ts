import Postagem from './Postagem'

interface User {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    linkedin: string;
    foto: string
    postagem?: Postagem| null
}

export default User;