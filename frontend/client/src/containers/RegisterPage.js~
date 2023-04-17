import Layout from "components/Layout";
import * as React from 'react';
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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

/*function Copyright(props) {
return (
<Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="/">
    al ameen
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
</Typography>
);
}*/
// <Copyright sx={{ mt: 5 }} />


const theme = createTheme();

const RegisterUrl = 'http://127.0.0.1:8000/api/users/register'


export default function RegisterPage() {
	
	const [firstName,setFirstName] = useState('');
	const [lastName,setLastName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [errors,setErrors] = useState([]);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { isAuthenticated } = useSelector(state =>state.user);
	
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	if(isAuthenticated === true)
    {
		navigate("/")
		return;
    }
	const handleSubmit = (event) => {
	event.preventDefault();
	if(((firstName === '') || (lastName === '') || (email === '') || (password === '')) && !emailRegex.test(event.target.value))
	{
			enqueueSnackbar("Fields can not be empty",{ variant: "error",anchorOrigin:{vertical:'top',horizontal:'center'}})
	}
	else{
		const info = {
			first_name: firstName,
    		last_name:lastName,
    		email:email,
    		password:password
    	}
   	axios.post(RegisterUrl,info, {
			headers:{
				'Content-Type':'application/json'		
				}
			}).then((response) => {
  			console.log(response.data);
  			navigate('/login')
  		}).catch((error) => {
	  		enqueueSnackbar(error.response.data.email[0],{ variant: "info",anchorOrigin:{vertical:'top',horizontal:'center'}})
		});
	};
}
const handleFnameChange = (event)=>{
	setFirstName(event.target.value)
}

const handleLnameChange = (event)=>{
	setLastName(event.target.value)
}

const handleEmailChange = (event)=>{
	setEmail(event.target.value)
}

const handlePasswordChange = (event)=>{
	setPassword(event.target.value)	
}

const handleBlurEmailChange = (event) =>{
	const isValidEmail = emailRegex.test(event.target.value); // true
	if(isValidEmail !== true)
	{
		enqueueSnackbar("Enter a valid email address",{ variant: "info",anchorOrigin:{vertical:'top',horizontal:'center'}})
	}
}
return (
<Layout title="Register" content="Register Page">
	<Container sx={{display:'flex',direction:'row',justifyContent:"center",alignItems:'center'}}>
	 <Paper elevation={10} sx={{width:"50%"}}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ mt: 5, bgcolor: 'secondary.main' }}>
        <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
            	 value={firstName}
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                size='small'
                autoFocus
                onChange={handleFnameChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                value={lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                size='small'
                onChange={handleLnameChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                size='small'
                value={email}
                id="email"
                label="Email Address"
                name="email"
                onBlur={handleBlurEmailChange}
                onChange ={handleEmailChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                value={password}
                fullWidth
                size='small'
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
            />
            </Grid>
            {/* <Grid item xs={12}>
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
            />

            </Grid> */}
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
            <Grid sx={{mb:5}} item>
            <Link href="/signin" variant="body2">
                Already have an account? Sign in
            </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
    </Paper>
    </Container>
</Layout>
);
}