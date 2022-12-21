import { Grid } from '@material-ui/core';
import React from 'react';
import './Sobre.css';
import { Box } from '@mui/material';

function Sobre() {
    return (
        <Grid className='papel'>
        <Grid justifyContent='center' alignItems='center'>
            <Box padding={3} textAlign='center'>
            <h1 className='fontbcsb tipofontsb'>Sobre o projeto Lady Debug</h1>
            </Box>
            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid >
          <img className='img' src='https://coda.newjobs.com/api/imagesproxy/ms/xmonsterfrx/marketing/images/women_IT_800x533.jpeg'></img>
        </Grid>
        </Grid>
            <Box padding={5} textAlign='center'>
                
            <h2 className='fontbcsb tipofontsb'> Somos um fórum de interações que abrange a conversação entre mulheres que são da área e mulheres interessadas a ingressar,
 com foco em perguntas e respostas sobre inovações e conceitos de programação. 
 Dados mostram que apenas 18% do total de profissionais nas empresas de tecnologia são mulheres. Visto que há uma desigualdade nesse mercado, 
 esse fórum tem um público alvo pois trata-se de uma ação afirmativa com o intuito de colocar mais mulheres 
 no ramo da tecnologia e seu ciclo de vida dura até atingirmos um número considerável do público feminino dentro do mercado
 de trabalho tecnológico, que monitoráriamos através de pesquisas feitas em nosso território (BRASIL).</h2>

            
            </Box>
        </Grid>
    </Grid>
    )
}


export default Sobre;