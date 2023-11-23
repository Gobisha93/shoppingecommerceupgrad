import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {
  return <AppBar>
    <Toolbar>
     <IconButton edge="start" color="inherit" aria-label="menu">
       <ShoppingCartIcon /></IconButton>
      <Typography variant="h6" style={{ flexGrow: 1 }}>upGrad E-Shop</Typography>
      {/* <InputBase placeholder="Search..." /> */}
      <Link to="/"></Link>
      <Link to="/login"style={{ color:'white',
paddingRight:'20px'}} >Login</Link>
      <Link to="/signup" style={{color:'white'}}>SignUp</Link>
    </Toolbar>
    </AppBar>
  
  
}

export default Navbar





