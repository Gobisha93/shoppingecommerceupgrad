import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, TextField, Button,AlertTitle,Alert} from '@mui/material'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { selectUserId, selectUserToken } from '../../common/rolesmanager';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const AddressPage = ({ manageAddress }) => {

    const user = useSelector(selectUserId);
    const userToken = useSelector(selectUserToken);
    const { register, handleSubmit } = useForm();
    const [address, setAddress] = useState(null);
    const [isDatasetLoading, setIsDatasetLoading] = useState(true);
    const selectedAddressReference = useRef('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data);
        let addressDetails = {
            ...data,
            user: user
        }
        console.log(addressDetails);
        
        axios.post('http://localhost:8080/api/addresses', JSON.stringify(addressDetails), {
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken,
                
            }, 
           
        }).then(response => {
            console.log(response);
            setError(false)
            setSuccess(true)
        }).catch(error => {
            setError(true)
            setSuccess(false)
            setErrorMessage(error.data)
            console.debug(error)
        });

    }

    useEffect(() => {
        if(userToken === 'undefined' || userToken === null){
            navigate('/login', { state: {'message' : 'Please sign in or sign up before placing your order'} });
        }
        const fetchData = async () => {
            let getAddreddURL = 'http://localhost:8080/api/addresses';
            axios.get(getAddreddURL, {
                headers: { 
                    'Authorization': 'Bearer ' + userToken,
                },
            }).then(response => {
                    setAddress(response.data);
                    setIsDatasetLoading(false)
            }).catch(error => {
                    console.debug(error)
                    setIsDatasetLoading(false)
            });
        };

        fetchData();
    }, [navigate, userToken]);

    const handleAddressSelection = () => {
        const dropdownSelectedAddress = selectedAddressReference.current.value;
        manageAddress(JSON.parse(dropdownSelectedAddress))
    }
    return (
        <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
            <Box>
                { error ? <>
                    <Alert severity="warning" style={{justifyContent: 'center'}}>
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                </> : <></>}
                { success ? <>
                    <Alert severity="success" style={{justifyContent: 'center'}}>
                        <AlertTitle>Successfully saved the address.</AlertTitle>
                    </Alert>
                </> : <></>}
            </Box>
            <div className="form-group" style={{paddingLeft:'125px'}}>
                <label htmlFor="addressDropdown" style={{ marginLeft: '5px', display: 'block' }}>Select Address</label>
                <select id="addressDropdown" className="form-control" ref={selectedAddressReference} onChange={handleAddressSelection} style={{width:'454px', height:'33px'}}>
                    <option value="{}">Select...</option>
                    {
                        isDatasetLoading ? <>Loading</>  : <>
                        {
                            address.map(address => {
                                return <option key={address.id} value={JSON.stringify(address)}>
                                            {address.city} - {address.street}
                                        </option>
                            })
                        }
                        </> 
                    }
                </select>
            </div>
            <Typography style={{ margin: '1em',paddingLeft:'300px'}}>
                -OR-
            </Typography>
            <Typography variant='h6' style={{paddingLeft:'280px'}}>
                Add Address
            </Typography>
            <Box sx={{ maxWidth: '60%', margin: 'auto' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField margin="normal" required fullWidth id="name"
                        label="Name" name="name" {...register('name')} />
                    <TextField margin="normal" required fullWidth id="contactNumber"
                        label="Contact Number" name="contactNumber" {...register('contactNumber')} />
                    <TextField margin="normal" required fullWidth id="street"
                        label="Street" name="street" {...register('street')} />
                    <TextField margin="normal" required fullWidth id="city"
                        label="City" name="city" autoComplete="city" {...register('city')} />
                    <TextField margin="normal" required fullWidth id="state"
                        name="state" label="State" {...register('state')} />
                    <TextField margin="normal" fullWidth id="landmark"
                        name="landmark" label="Landmark" {...register('landmark')} />
                    <TextField margin="normal" required fullWidth id="zipcode"
                        name="zipcode" label="Zip Code" {...register('zipcode')} />
                    <Button type="submit" variant="contained" style={{ width: '100%', marginTop: '1em' }}>Save Address</Button>
                </form>
            </Box>
        </Box>
    )
}

export default AddressPage;
