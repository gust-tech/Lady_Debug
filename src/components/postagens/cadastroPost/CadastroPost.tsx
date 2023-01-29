import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Grid } from "@material-ui/core";
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import User from '../../../models/User';

function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const [users, setUsers] = useState<User[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")

        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            assunto: '',
            descricao: '',
            postagem: null
        })
    
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })
    
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null,
        usuario: null
    })

    useEffect(() => { 
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => { 
        setPostagem({
            ...postagem,
            usuario: user
        })
    }, [user])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getUsers()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getUsers() {
        await busca("/usuarios", setUsers, {
            headers: {
                'Authorization': token
            }
        })
    }


    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: user
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return (
        <>

    <Grid className='fundotema'>
            <Grid alignItems="center" item xs={12} className='fundopost'>
            <form onSubmit={onSubmit}  className='formpost'>

                <Typography variant="h4" className='fontpost' component="h1" align="center">Cadastro de Postagem 📝</Typography>
                <TextField className='corpostcaixa' value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="Título" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField className='corpostcaixa'value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="Texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label" className='fontpreta'>Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.assunto}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormControl>
                    <InputLabel id="demo-simple-select-helper-label" className='fontpreta'>Usuário </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/usuarios/${e.target.value}`, setUser, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            users.map(user => (
                                <MenuItem value={user.id}>{user.nome}</MenuItem>
                            ))
                        }
                    </Select>
                    </FormControl>
                    <FormHelperText className='fontpreta'>Escolha um tema e usuário para finalizar</FormHelperText>
                    <Button type="submit" variant="contained" color="primary" className='atum'>
                        Finalizar
                    </Button>
                </FormControl>
            </form>
            </Grid>
        </Grid>

        </>
    )

}

export default CadastroPost;