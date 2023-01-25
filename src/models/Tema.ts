import Postagem from "./Postagem";

interface Tema{
    id: number;
    assunto: string;
    descricao: string;
    postagem?: Postagem|null
}

export default Tema;