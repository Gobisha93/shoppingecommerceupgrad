import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navbar from './components/Navigation/Navbar';
import LoginPage from './components/Header/LoginPage';
import Home from './components/Home';
import SignUpPage from './components/Header/SignUpPage';
import UserPage from './components/UserPage';
import ProductsPage from './components/Product/ProductsPage';

function App() {
  return   <Router>
      <Navbar />
      
      <Routes>
      <Route exact path='/' element={< Home />}></Route>
      <Route exact path='/login' element={< LoginPage />}></Route>
      <Route exact path='/signup' element={< SignUpPage />}></Route>
      <Route exact path='/products' element={< ProductsPage />}></Route>
      <Route exact path='/userpage' element={< UserPage />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
      {/* <Route path="/login" exact component={LoginPage} /> */}
      
      </Routes>
      
    </Router>
       
    
    
  
};

export default App;
