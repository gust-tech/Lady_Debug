import React, { useEffect } from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import './Home.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TabPostagem from '../../postagens/tabpostagem/TabPostagem';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { TabTitle } from '../../../tituloPaginas/GeneralFunctions';

function Home() {

    let navigate = useNavigate();
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
    }, [token]);
    TabTitle('Lady Debug - Home');
    return (
        <>
            <Grid container direction="row"  alignItems="center" className='imagemhome'>
                <Grid alignItems="center" item xs={12}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='fontes'>Seja bem-vinda!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='fontes'>Esperamos que aprenda e repasse bastante conhecimento!</Typography>
                    </Box>
                    <Grid xs={12}>
                        <Box  className='img4 imagemcentrada'/>
                    </Grid>
                   
                </Grid>
                <Grid item xs={6} className=''>
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;