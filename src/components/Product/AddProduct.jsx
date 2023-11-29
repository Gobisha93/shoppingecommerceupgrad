import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'
;import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel  } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../common/rolesmanager';


const defaultTheme = createTheme();
export const AddProduct =() =>{
    const userToken = useSelector(selectUserToken);
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [manufacturer, setManufacturer] = useState('');
const [availableItems, setAvailableItems] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
        name,
        price,
        description,
        manufacturer,
        availableItems,
        imageUrl,
        category
    };

    console.log(userData);

    try {
      const response = await axios.post('http://localhost:8080/api/products', JSON.stringify(userData),
      {
       
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ userToken
        },
       
    }) 
    setSuccessMessage('Product Added successfully');
    setErrorMessage('');  
    console.log(response);
   }catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error updating product. Please try again.');
        console.error('Error:', error.message);
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           {successMessage && (
              <Typography variant="body1" sx={{ mt: 2, color: '#3bc303' }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body1" sx={{ mt: 2, color: 'red' }}>
                {errorMessage}
              </Typography>
            )}
            <Typography component="h1" variant="h5" >
              Add Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
     <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>          
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={handleChange}
     style ={{width:'400px'}}
  >
    
    <MenuItem value="Apparel">Apparel</MenuItem>
    <MenuItem value="Electronics">Electronics</MenuItem>
    <MenuItem value="Footwear">Footwear</MenuItem>
    <MenuItem value="PersonalCare">PersonalCare</MenuItem>
  </Select>
  </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="manufacturer"
                label="Manufacturer"
                name="manufacturer"
                autoComplete="manufacturer"
                onChange={(e) => setManufacturer(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="availableitems"
                label="Available items"
                name="availableitems"
                autoComplete="availableitems"
                onChange={(e) => setAvailableItems(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                onChange={(e) => setPrice(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="imageurl"
                label="Image URL"
                name="imageurl"
                autoComplete="imageurl"
                onChange={(e) => setImageUrl(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                autoComplete="description"
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >Save Product
                
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  )
}


export default AddProduct;
