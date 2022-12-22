import { Grid } from '@material-ui/core';
import React from 'react';
import './Sobre.css';
import { Box } from '@mui/material';
import { TabTitle } from '../../tituloPaginas/GeneralFunctions';

function Sobre() {
    TabTitle('Lady Debug - Sobre');
    return (
        <Grid container direction="row"  alignItems="center">
        <Grid alignItems="center" item xs={12}  className='imagemsobre'>
            <Box padding={3} textAlign='center'>
            <h1 className='fontesobre'>Sobre o projeto Lady Debug</h1>
            </Box>
            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid >
        </Grid>
        </Grid>
            <Box padding={5} textAlign='center'>
                
            <h2 className='fonttextosobre tipofontsb'> Somos um fórum de interações que abrange a conversação entre mulheres que são da área de tecnologia e mulheres interessadas a ingressar,
 com foco em perguntas e respostas, troca de experiências e principalmente incentivo. No nosso fórum são compartilhadas inovações a todo momento, na voz de mulheres de todo Brasil.
 Dados mostram que apenas 18% do total de profissionais nas empresas de tecnologia são mulheres. Visto isso, a ONU afim de diminuir a desigualdade entre os gêneros criou a quinta ODS, que visa eliminar todas as formas de discriminação com mulheres e meninas em todas as partes do mundo!
E dentro da tecnologia podemos perceber hoje, um nítido desequilibrio. 
 Esse fórum tem um público alvo pois trata-se de uma ação afirmativa com o intuito de colocar mais mulheres 
 na área da tecnologia e seu ciclo de vida dura até atingirmos um número considerável de mulheres dentro do mercado
tecnológico, que monitoráriamos através de pesquisas feitas em nosso território (BRASIL).</h2>

            
            </Box>
        </Grid>
    </Grid>
    )
}


export default Sobre;