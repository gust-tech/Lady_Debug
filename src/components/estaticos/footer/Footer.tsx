import React from 'react';
import GithubIcon from '@material-ui/icons/GitHub';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css'
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';

function Footer() {
        const token = useSelector<TokenState, TokenState["tokens"]>(
            (state) => state.tokens
          );
          var footerComponent;
          if(token != ""){
            footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className='box1'>
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h5" align="center" gutterBottom className='textos'>Sigam-nos no GitHub! </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://github.com/Equipe03-Generation" target="_blank">
                            <GithubIcon className='redes' />
                        </a>
                    </Box>
                </Box>
                <Box className='box2'>
                    <Box>
                        <a target="_blank" href="https://github.com/Equipe03-Generation/Dev_Girls_React">
                            <Typography variant="subtitle2" gutterBottom className='textos' align="center">Repositório do Projeto</Typography>
                        </a>
                    </Box>
                </Box>
            </Grid>
        </Grid>
          }

    return (
        <>
        {footerComponent}
        </>
    );
}

export default Footer;