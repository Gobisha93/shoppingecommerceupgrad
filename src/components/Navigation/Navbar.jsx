import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUserRole, setUserRole, setUserId } from '../../common/rolesmanager';
import SearchBar from '../SearchPage/SearchBar';
import "../../common/style.css";




const Navbar = () => {
  const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlingLogout = () => {
      dispatch(setUserRole('DEFAULT'));
      dispatch(setUserId(null));
      navigate('/');
  };
  return <AppBar sx={{backgroundColor:'#3f51b5'}}>
    <Toolbar>
     <IconButton edge="start" color="inherit" aria-label="menu">
       <ShoppingCartIcon /></IconButton>
      <Typography variant="h6" style={{ flexGrow: 1 }}>upGrad E-Shop</Typography>
      
      
     
      {userRole === 'DEFAULT' ? <>
                <Link to={{pathname:"/login", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography   variant="body1" color="inherit" component="div">
                        Login
                        </Typography>
                    </Link>
                    <Link to={{pathname:"/signup", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography   variant="body1" color="inherit" component="div">
                        SignUp
                        </Typography>
                    </Link></> : ``
                }
                   
       {userRole === 'ADMIN' ? <>
       <SearchBar/>
       <Link to={{pathname:"/products", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography   variant="body1" color="inherit" component="div">
                            Home
                        </Typography>
                    </Link>
                    <Link to={{pathname:"/addproduct", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography   variant="body1" color="inherit" component="div">
                            Add Product
                        </Typography>
                    </Link>
                    <button type="button" id="logout" className ="btn btn-danger" onClick={handlingLogout}>LOGOUT</button>
                  
                    
                </>: ``}
                {userRole === 'USER' ? <>
                <SearchBar/>
       <Link to={{pathname:"/", state: null}} style={{margin: 10, color: 'white'}} >
                        <Typography   variant="body1" color="inherit" component="div">
                            Home
                        </Typography>
                    </Link>
                    
                    <button type="button" id="logout" className ="btn btn-danger" onClick={handlingLogout}>LOGOUT</button>
                  
                    
                </>: ``}
               
      {/* <Link to="/login"style={{ color:'white',
paddingRight:'20px'}} >Login</Link>
      <Link to="/signup" style={{color:'white'}}>SignUp</Link> */}
     
    </Toolbar>
    </AppBar>
  
  
}

export default Navbar





