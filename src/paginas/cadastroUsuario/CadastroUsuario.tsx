import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid,  Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';
import { TabTitle } from '../../tituloPaginas/GeneralFunctions';
import CircularProgress from '@mui/material/CircularProgress';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true);
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        toast.success('Usuario registrado com êxito!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
            });
            setLoading(false);
        }else{
            toast.error('Dados inconsistentes. Corrija e tente novamente.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
                setLoading(false);
        }
    }
    TabTitle('Lady Debug - Cadastro');
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='papel'>
            <Grid alignItems="center" item xs={12} className='fundocadastro'>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} alignItems='center'>
                <Box paddingX={50}>
                    <form onSubmit={onSubmit}>                        
                        <Typography variant='h4' gutterBottom color='textPrimary' component='h4' align='center' className='fontcadastro'>Crie sua conta abaixo</Typography>
                        <TextField className='branco2' value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' name='nome' margin='normal' fullWidth />
                        <TextField className='branco2' value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuario' label='Email' name='usuario' margin='normal'fullWidth />
                        <TextField className='branco2' value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='Senha'  name='senha' margin='normal' type='password' fullWidth />
                        <TextField className='branco2' value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='Confirmar Senha' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <TextField className='branco2' value={user.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' label='Foto' name='foto' margin='normal' fullWidth />
                        <Box marginTop={5} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='botaoCancelarusuario'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary' className='botaocadastrousuario' disabled={loading}>
                            {loading?<CircularProgress color="secondary" />:'Cadastrar'}
                            </Button>
                        </Box>
                    </form>
                    </Box>
                </Grid>
                </Grid>
            </Grid>
    );
}

export default CadastroUsuario;