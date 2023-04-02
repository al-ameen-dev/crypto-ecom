import Layout from "components/Layout";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useImmer } from 'use-immer';

const Profile = () =>{
	const userInfoUrl = 'http://127.0.0.1:8000/api/products/userinfo'
	const { isAuthenticated, user, userinfo, updateflag, token } = useSelector(state =>state.user)
	const [infoData,setInfoData] = useImmer({...userinfo});
	const { enqueueSnackbar } = useSnackbar();
	const [error,setError] = useState('')
	const [urlForPostUpdate,setUrlForPostUpdate] = useState(null)
	
	 const navigate = useNavigate()
	 useEffect(()=>{
			if(isAuthenticated === false)
	 		{
			 navigate('/')
			}
	 },[])
	 const handleAddressChange =(event)=>{
		setInfoData(draft=>{
			draft.address = event.target.value});
	 }
	 const handlePincodeChange =(event)=>{
		setInfoData(draft=>{
			draft.pincode = event.target.value});
	 }
	 const handleCityChange =(event)=>{
		setInfoData(draft=>{
			draft.city = event.target.value});
	 }
	 const handleStateChange =(event)=>{
		setInfoData(draft=>{
			draft.state = event.target.value});
	 }
	 
	 const checkEmpty =()=>{
			 if((infoData.address === '') || (infoData.address === undefined ) || (infoData.pincode === '')
			 ||(infoData.pincode === undefined)|| (infoData.city === undefined) 
			 || (infoData.city === '') || (infoData.state === '')|| (infoData.state === undefined))
			{
				enqueueSnackbar("Fields can not be empty",{ variant: "error",anchorOrigin:{vertical:'top',horizontal:'center'}})
				return true;
			}
	 }
	 const handleUpdate =(event)=>{
	 		 event.preventDefault();
	 		 
	 		 if(checkEmpty())
				{
				}
			else{
				const info = {
			 	user:infoData.user,
				address:infoData.address,
				pincode:infoData.pincode,
				city:infoData.city,
				state:infoData.state
			 }
			 axios.put(userInfoUrl,info,{
				headers:{
          		'Authorization': 'Bearer '+token,
        		}}).then((response)=>{
			 	enqueueSnackbar(response.data.message,{ variant: "success",anchorOrigin:{vertical:'top',horizontal:'center'}})
			 }).catch((error)=>{
				console.log(error)			 
			 })
			}
			 
			 
	 }
	 
	 const handleSubmit =(event)=>{
	 		 event.preventDefault();
	 		 if(checkEmpty())
	 		 {
	 		 	
	 		 }
				else{
				const info = {
				address:infoData.address,
				pincode:infoData.pincode,
				city:infoData.city,
				state:infoData.state
			 }
			 console.log(info)
			 axios.post(userInfoUrl,info,{
				headers:{
          		'Authorization': 'Bearer '+token,
        		}}).then((response)=>{
			 	enqueueSnackbar(response.data.message,{ variant: "success",anchorOrigin:{vertical:'top',horizontal:'center'}})
			 }).catch((error)=>{
				console.log(error)			 
			 })
			}
	 }
    return(
        <Layout title="Profile" content="Dashboard Page">
            <Container component="main" >
    <CssBaseline />
    <Box
        sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonPinOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            User Profile
        </Typography>
        <Box component="form" noValidate onSubmit={updateflag ? handleUpdate : handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                value={user.first_name}
                name="firstName"
                fullWidth
                id="firstName"
                autoComplete
                size="small"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                value={user.last_name}
                fullWidth
                id="lastName"
                name="lastName"
                size="small"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                value={user.email}
                fullWidth
                id="email"
                name="email"
                size="small"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            	 multiline
            	 maxRows={4}
                required
                fullWidth
                name="address"
                onChange={handleAddressChange}
                value={infoData.address}
                label={updateflag && infoData.address !== '' ? "":"Shipping Address"}
                id="address"
                autoComplete="Shipping-adress"
                size="small"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                onChange={handlePincodeChange}
                value={infoData.pincode}
                id="pincode"
                label={updateflag && infoData.pincode !== '' ? "":"Pin code"}
                name="pincode"
                autoComplete="pincode"
                size="small"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="city"
                onChange={handleCityChange}
                value={infoData.city}
                label={updateflag && infoData.city !== '' ? "":"City"}
                name="city"
                autoComplete="city"
                size="small"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="state"
                onChange={handleStateChange}
                value={infoData.state}
                label={updateflag && infoData.state !== ''  ? "":"State"}
                name="state"
                autoComplete="email"
                size="small"
            />
            </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            { updateflag ? "Update Profile" : "Submit Profile"}	
        </Button>
        </Box>
    </Box>
    </Container>
    
        </Layout>
    )
}

export default Profile;