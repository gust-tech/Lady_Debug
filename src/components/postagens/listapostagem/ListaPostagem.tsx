import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import {  Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { TabTitle } from '../../../tituloPaginas/GeneralFunctions';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
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
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

   }, [posts.length]);
  TabTitle('Lady Debug - Postagens');

  return (
    <>
    <Grid container className= 'displayflex'>
      {
        posts.map(post => (
          <Box m={1} className='caixalistapost'>
            <Card variant="outlined" className='papelpost'>
              <CardContent>
                <Typography color="textSecondary" gutterBottom className='cordefundo'>
                  Postagem
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.assunto}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained"size='small' className="atum">
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        Deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>

        ))
      } 
       </Grid>
    </>
  )
}

export default ListaPostagem;