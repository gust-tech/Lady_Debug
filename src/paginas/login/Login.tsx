import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from "../../store/tokens/actions";
import { toast } from 'react-toastify';
import { TabTitle } from '../../tituloPaginas/GeneralFunctions';

function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>) {

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

            useEffect(()=>{
                if(token != ''){
                    dispatch(addToken(token));
                    navigate('/home')
                }
            }, [token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/auth/logar`, userLogin, setToken)
                toast.success('Usuário conectado com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });
            }catch(error){
                toast.error('Dados do usuário inconsistentes. Falha ao logar!', {
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
        }
    TabTitle('Lady Debug - Login');
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='fundologin1'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit} >
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='font'>Conecte-se 💻➡️🌎</Typography>
                        <TextField className='caixalogin bordalogin' value={userLogin.usuario}  onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='Usuario' label ='Usuario'  name='usuario' margin='normal' fullWidth />
                        <TextField className='caixalogin bordalogin' value={userLogin.senha}  onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha'  label='Senha' name='senha' margin='normal' type='password'fullWidth />
                        <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary' className='atum'>
                                    Logar
                                </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2} >
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center' className='font'>Não tem uma conta? 🤔</Typography>
                        </Box>
                        <Link className='link' to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center'>Cadastre-se</Typography>
                        </Link>
                    
                            
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagemfundologin'>

            </Grid>
        </Grid>
    );
}

export default Login;