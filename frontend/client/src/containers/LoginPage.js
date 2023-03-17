import Layout from "components/Layout";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser } from 'features/user';
import { useState } from 'react';


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
//<Copyright sx={{ mt: 8, mb: 4 }} />
const LoginUrl = 'http://127.0.0.1:8000/api/token/'
const meUrl = 'http://127.0.0.1:8000/api/users/me'

export default function LoginPage() {
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [tok,setTok] = useState('');
  	const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const info = {
      email: data.get('email'),
      password: data.get('password'),
    };
    axios.post(LoginUrl,info).then((response) => {
    	dispatch(setToken(response.data));
    	setTok(response.data.access);
    	axios.get(meUrl,{
				headers:{
					'Authorization': 'Bearer ' + response.data.access,				
				}			
			}).then((response)=>{
				console.log(response.data)
				dispatch(setUser(response.data));
			}).catch((error)=>{
				console.log(error)
			})
	  //navigate("/")
	}).catch((error) => {
		console.error(error);
	});
	
  };

  return (
    <Layout title="Login" content="Login Page">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </Layout>
  );
}
