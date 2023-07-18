import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenState } from '../../store/tokens/tokensReducer';
import './ListaUsuario.css';
import User from '../../models/User';
import { busca } from '../../services/Service';
import { TabTitle } from '../../tituloPaginas/GeneralFunctions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

function ListaUsuario() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (i: any) => {
    setExpanded(expanded === i ? -1 : i);
  };

  const [user, setUser] = useState<User[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState['tokens']>(
    state => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logade!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        progress: undefined,
      });
      navigate('/login');
    }
  }, [token]);

  async function getUsers() {
    await busca('/usuarios', setUser, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getUsers();
  }, [user.length]);
  TabTitle('Lady Debug - Usuários');

  return (
    <>
      {user.length === 0 && (
        <div className="loader-content">
          <span className="loader"></span>
        </div>
      )}

      {user.map((user, i) => (
        <Grid container direction="row" alignItems="center">
          <Grid alignItems="center" item xs={12} className='fundoequipe'>
            <Card className="papel center" variant="outlined">
              <CardContent>
                <img src={user.foto}
                  className='tamanhos imagemequipe centralizarftuser' alt='' />

                <li className='fontequipe tipofonteq'>{user.nome}</li>
                <a href={user.usuario} target="_blank" rel="noopener noreferrer">
                  <img src="https://camo.githubusercontent.com/c00f87aeebbec37f3ee0857cc4c20b21fefde8a96caf4744383ebfe44a47fe3f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4c696e6b6564496e2d2532333030373742353f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465"
                    data-canonical-src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt='' />
                </a>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}

    </>
  )
}

export default ListaUsuario;