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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
	
	const navigate = useNavigate()
	const { isAuthenticated } = useSelector(state =>state.user)
	if(isAuthenticated === true)
    {
		navigate("/")
		return;
    }
	const handleSubmit = (event) => {
	event.preventDefault();
	const data = new FormData(event.currentTarget);
	console.log(data)
	const info = {
		first_name: data.get('firstName'),
    	last_name: data.get('lastName'),
    	email:data.get('email'),
    	password:data.get('password')
    }
   axios.post(RegisterUrl,info, {
		headers:{
			'Content-Type':'application/json'		
		}
		}).then((response) => {
  		console.log(response.data);
  		navigate('/login')
  	}).catch((error) => {
	  console.error(error);
	});
};

return (
<Layout title="Register" content="Register Page">
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
            <Grid item>
            <Link href="/signin" variant="body2">
                Already have an account? Sign in
            </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
</Layout>
);
}