import React from 'react';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useDispatch } from "react-redux";
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';
import ModalPostagem from '../../postagens/modalPostagem/ModalPostagem';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    function goLogout(){
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        navigate('/login')
    }

    var navbarComponent;


    if(token != ""){
        navbarComponent = <AppBar position="static">
        <Toolbar variant="dense" className='bgnav centro'>

            <Box display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/5544/5544224.png" height={40} alt="" />
                        <br />
                        Home
                    </Box>
                </Link>
                <Link to="/equipe" className="text-decorator-none sizeicons">
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/1283/1283218.png" height={40} alt="" />
                        <br />
                        Equipe
                    </Box>
                </Link>
                <Link to="/sobre" className="text-decorator-none">
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/6488/6488588.png" height={40} alt="" />
                        <br />
                        Sobre
                    </Box>
                </Link>
                <Link to="/posts" className="text-decorator-none">
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/7782/7782698.png" height={40} alt="" />
                        <br />
                        Posts
                    </Box>
                </Link>
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <ModalPostagem/>
                        +Post
                    </Box>               
                <Link to="/temas" className="text-decorator-none">
                <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/1443/1443029.png" height={40} alt="" />
                        <br />
                        Temas
                </Box>
                </Link>
                <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/1658/1658958.png" height={40} alt="" />
                        <br />
                        +Tema
                </Box>
                </Link>
                <Link to="/usuarios" className="text-decorator-none sizeicons">
                    <Box mx={5} className='cursor text-decorator-none center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/5027/5027793.png" height={40} alt="" />
                        <br />
                        Usuários
                    </Box>
                </Link>
              
                    <Box mx={5} className='cursor' onClick={goLogout}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6488/6488629.png" height={40} alt="" />
                        <br />
                        Sair
                    </Box>
                
            </Box>

        </Toolbar>
    </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;