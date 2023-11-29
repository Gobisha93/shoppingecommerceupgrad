import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Alert, AlertTitle } from '@mui/material';
import { AddressPage } from '../Order/AddressPage';
import { ConfirmPage } from '../Order/ConfirmPage';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUserId, selectUserToken } from '../../common/rolesmanager';
import axios from 'axios';

const steps = ['Items', 'AddressPage', 'ConfirmPage'];

export const CheckoutPage = () => {
    
    const location = useLocation();
    const orderDetails = location.state
    const [activeStep, setActiveStep] = useState(1);
    const [address, setAddress] = useState('');
    const [addressSelected, setAddressSelected] = useState(true);
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const userToken = useSelector(selectUserToken);

    const handleNext = () => {
        if(activeStep >= 1 && address === ''){
            setAddressSelected(false)
            return
        }
        
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const manageAddress = (data) => {
        if(data === '' && activeStep === 1){
            setAddressSelected(false)
        }else{
            setAddressSelected(true)
            setAddress(data);
        }
    }

    const handleBack = () => {
        if (activeStep === 1)
            navigate(-1);
        else
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return <AddressPage manageAddress={manageAddress} />;
            case 2:
                var data = {...orderDetails, address}
                return <ConfirmPage state = {data} />;
            default:
                return '';
        }
    };

    const handlePlaceOrder = () => {
        var data = {
            'quantity': orderDetails.quantity.productQuantity,
            'user': userId,
            'product': orderDetails.product.id,
            'address': address.id,
        }

       
        axios.post('http://localhost:8080/api/orders', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            },
        }).then(response => {
            navigate('/products', {state: {'purchaseComplete': true, 'message':'Your order with order Id '+response.data+' has been placed successfully', 'orderId': response.data}})
        }).catch(error => {
            console.debug(error)
        });
    }

    return (
        <div style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '3em', marginBottom: '3em', maxWidth: '80%' }}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: 'white', paddingTop: '2em', paddingBottom: '0.5em', marginBottom: '1em', borderRadius: '2px' }}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            
            <Box>
                {
                    !addressSelected ? <>
                        <Alert severity="warning" style={{
                            justifyContent: 'center', margin: 'auto', marginTop: 20, maxWidth: 750
                        }}>
                            <AlertTitle>Please select or add a address before moving to checkout.    </AlertTitle>
                        </Alert>
                    </> : <></>
                }
            </Box>

            <Box>
                {activeStep === steps.length ? (
                    navigate('/products', {state: {'purchaseComplete': true, 'message':'Order placed successfully'}})
                ) : (
                <Box>
                    {getStepContent(activeStep)}
                    <Box sx={{ margin: 5,paddingLeft:'350px' }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        {
                            activeStep === steps.length - 1 ? 
                            <Button variant="contained" onClick={handlePlaceOrder} >
                                Place Order
                            </Button> : 
                            <Button variant="contained" onClick={handleNext} >
                                Next
                            </Button>
                        }
                    </Box>
                </Box>
          )}
            </Box>
        </div>
    )
}
export default CheckoutPage;