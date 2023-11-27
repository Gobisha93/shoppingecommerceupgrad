import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button,ToggleButton,
  InputLabel,Select,MenuItem, ToggleButtonGroup,FormControl,Box,IconButton ,CardActions,Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
  import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
 import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUserRole ,selectUserToken} from "../../common/rolesmanager";
const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 const [productcatgry, setProductcatgry] = useState(null);
 const [catgry] = useState('all');
 const userRole = useSelector(selectUserRole);
 const [open, setOpen] = useState(false);
 const userToken = useSelector(selectUserToken);
 const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 

 const [selectedOption, setSelectedOption] = useState('');

 const handleSelectChange = (event) => {
   setSelectedOption(event.target.value);
 };
 const addingCart = (productDetails) => {
  navigate('/productDetails', { state: { product: productDetails } });
}
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
        setProductcatgry(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleOpen = () => {
    setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
  const handleCategryChange = (_,newCategory) => {
    if(newCategory === 'All')
    setProducts(productcatgry)
    else {
     
      setProducts(productcatgry.filter(product => product.category === newCategory));
  }
};
const handleSubmit = (id) => {
  axios.delete(`http://localhost:8080/api/products/${id}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userToken
          },
      }).then((response) => {
          console.debug(response);
          setSuccessMessage(`Product deleted successfully`);
    setErrorMessage('');
      }).catch((error) => {
          console.debug(error)
          setSuccessMessage('');
    setErrorMessage('Error updating product. Please try again.');
      });
  setProducts(products.filter(product => product.id !== id))
  setOpen(false);
};
  return (
    <div>
    <Container sx={{ marginTop: 10 }}>
      
    <ToggleButtonGroup sx ={{marginLeft:40}}
      color="primary"
      value={catgry}
      exclusive
      onChange={handleCategryChange}
     
      aria-label="Platform"
    >
      <ToggleButton value="All">All</ToggleButton>
                    <ToggleButton value="Apparel">Apparel</ToggleButton>
                    <ToggleButton value="Electronics">Electronics</ToggleButton>
                    <ToggleButton value="Furniture">Furniture</ToggleButton>
                    <ToggleButton value="Personal Care">Personal Care</ToggleButton>
    </ToggleButtonGroup>
    <Box>
                    <FormControl style={{ minWidth: 300, float: 'left', marginTop: 25, textAlign: 'justify' }}>
                        <InputLabel id="sortBy">Sort By</InputLabel>
                        <Select
                            labelId="sortBy" id="sortBy"
                            label="Sort By"  value={selectedOption}
                            onChange={handleSelectChange}>
                              <MenuItem value="">Select an option</MenuItem>
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="high-low">Price: High to Low</MenuItem>
                            <MenuItem value="low-high">Price: Low to High</MenuItem>
                            <MenuItem value="newsest">Newest</MenuItem>
                        </Select>
                    </FormControl>
                    {successMessage && (
              <Typography variant="body1" sx={{ mt: 2, color: '#3bc303',float:'right' }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body1" sx={{ mt: 2, color: 'red' }}>
                {errorMessage}
              </Typography>
            )}
                </Box>
    </Container>
    <Container style={{ backgroundColor: 'whitesmoke',marginTop:'150px' }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="350"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" style={{ textAlign: 'left',fontSize:'large' }}>{product.name}</Typography>
                
                <Typography variant="h6" color="primary" style={{ textAlign: 'right',fontSize:'large', marginTop:'-29px' }}>
                  ${product.price}
                </Typography>
                <Typography variant="body2"color="text.secondary" style={{ textAlign: 'justify', marginTop: 20, minHeight: 115 }}>
                  {product.description}
                </Typography>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button variant="contained" size="small" onClick={() => addingCart(product)} >BUY</Button>
                </div>
                {
                    userRole === 'ADMIN' ?
                        <div>
                            <IconButton  aria-label="edit" onClick={() => navigate(`/modifyProduct`, { state: product,productcatgry: productcatgry.category || 'defaultCategory'  })}>
                                <ModeEditOutlineIcon size="small" style={{ textAlign: 'left', color: '#424242' }} />
                            </IconButton>
                            <IconButton  onClick={handleOpen} aria-label="delete">
                                <DeleteIcon size="small" style={{ textAlign: 'left', color: '#424242' }} />
                            </IconButton>
                        </div> : <></>
                }
            </CardActions>
              </CardContent>
              <Dialog open={open} onClose={handleClose}  sx={{opacity:1 }} >
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit(product.id)} color="primary" variant="contained">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default ProductPage;
