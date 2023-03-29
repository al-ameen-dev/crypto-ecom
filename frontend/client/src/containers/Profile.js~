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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () =>{
	const userInfoUrl = 'http://127.0.0.1:8000/api/products/userinfo'
	const [infoData,setInfoData] = useState({})
	let urlflag = null;
	const { isAuthenticated, user } = useSelector(state =>state.user)
	 const navigate = useNavigate()
	 useEffect(()=>{
			if(isAuthenticated === false)
	 		{
			 navigate('/')
			}
			const storedata = JSON.parse(localStorage.getItem("mydata"));
			axios.get(userInfoUrl,{
				headers:{
          		'Authorization': 'Bearer '+storedata.tokendata.token,
        		}}).then((response)=>{
					if(response.flag === 0)
					{
							urlflag = 0;				
					}
					else
					{
						urlflag = 1;
						setInfoData(response.data)
					}
        		})
			
	 },[])
	 const handleSubmit =()=>{}
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                value={user.first_name}
                name="firstName"
                fullWidth
                id="firstName"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                value={user.last_name}
                fullWidth
                id="lastName"
                name="lastName"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                value={user.email}
                fullWidth
                id="email"
                name="email"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            	 multiline
            	 maxRows={4}
                required
                fullWidth
                name="shipping address"
                label="Shipping Address"
                id="address"
                autoComplete="Shipping-adress"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="pincode"
                label="Pin code"
                name="pincode"
                autoComplete="pincode"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="state"
                label="State"
                name="email"
                autoComplete="email"
            />
            </Grid>
        </Grid>
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Update Profile	
        </Button>
        </Box>
    </Box>
    </Container>
        </Layout>
    )
}

export default Profile;