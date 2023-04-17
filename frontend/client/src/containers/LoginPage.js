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
import LoginIcon from '@mui/icons-material/Login';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
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
//<Copyright sx={{ mt: 8, mb: 4 }} />
const LoginUrl = 'http://127.0.0.1:8000/api/token/'

export default function LoginPage() {
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const { isAuthenticated } = useSelector(state=>state.user)
	const { enqueueSnackbar } = useSnackbar();
	
	if(isAuthenticated === true)
    {
		navigate("/")
    }
  	const handleSubmit = (event) => {
    event.preventDefault();
    if((email === '' || password === ''))
    {
		    enqueueSnackbar("Fields can not be empty",{ variant: "error",anchorOrigin:{vertical:'top',horizontal:'center'}})
    }
    else{
			 const info = {
      		email: email,
      		password: password,
    	};
    	axios.post(LoginUrl,info).then((response) => {
    		const expirytime = new Date().getTime()+(30*60*1000)
    		const tokendata ={token:response.data.access}
    		localStorage.setItem('mydata',JSON.stringify({tokendata,expirytime}))
	  		navigate("/")
		}).catch((error) => {
			enqueueSnackbar("User credentials are incorrect",{ variant: "error",anchorOrigin:{vertical:'top',horizontal:'center'}})
		});
    }
  };
	const handleEmailChange = (event)=>{
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event)=>{
		setPassword(event.target.value)
	}

  return (
    <Layout title="Sign in" content="Login Page">
		<Container sx={{display:'flex',direction:'row',justifyContent:"center",alignItems:'center'}}>    	
    	<Paper elevation={10} sx={{width:'50%'}}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
          <Avatar sx={{ mt: 5, bgcolor: 'secondary.main' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              size='small'
              onChange={handleEmailChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              size='small'
              onChange={handlePasswordChange}
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
              {/*<Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>*/}
              <Grid item sx={{mb:5}}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
