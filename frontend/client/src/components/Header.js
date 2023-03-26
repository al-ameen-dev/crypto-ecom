import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import Cart from 'components/Cart';
//
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
//import Login from 'components/Login';
import {  } from 'features/user';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, setUser, setLogin, setToken } from 'features/user';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';


const drawerWidth = 240;
const meUrl = 'http://127.0.0.1:8000/api/users/me'

export default function Header(props){
	
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const { isAuthenticated, user} = useSelector(state => state.user);
	const [open, setOpen] = useState(false);
  
  useEffect(()=>{
    if(localStorage.getItem("mydata") !== null)
    {
    	const storedata = JSON.parse(localStorage.getItem("mydata"));
    	if(storedata && storedata.expirytime > new Date().getTime())
    	{
    		dispatch(setLogin())
    		dispatch(setToken(storedata.tokendata.token))
      	axios.get(meUrl,{
        		headers:{
          		'Authorization': 'Bearer '+storedata.tokendata.token,
        		}
      	}).then((response)=>{
       		 dispatch(setUser(response.data))
        		dispatch(setLogin())
      	}).catch((error)=>{
       	 	console.log(error)
      	})
    	}
    	else
    	{
			navigate('/login')
    	}
      

    }
  },[])
  
	
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
	
	const handleLogout = () =>{
    localStorage.removeItem("mydata")
		dispatch(setLogout())	
	}
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
   };

	
	const styles={
		appbar:{
			bgcolor:'grey.50',
			borderBottomLeftRadius:'3%',
			borderBottomRightRadius:'3%',
		},
		
		icon:{
			mr: 2,
			color:'#000',
			display: { 
				sm: 'none'
			} 
		},
		txtWhite:{
			color:'#fff',	
		},
		txtBlack:{
			color:'#000',
		},
		
		appbarTitle:{
			flexGrow:'1',
			color:'#000',
		},
		
		appbarWrap:{
			width:'80%',
			margin:'0 auto',		
		},
		
		nav:{
			display: { 
				xs: 'none',
				sm: 'block'
			}		
		},
	}
	
	const authLinks = (
    <>
      <Button key="Profile" sx={styles.txtBlack} component={RouterLink} to="/profile" >
        MyProfile
      </Button>
      <Button key="Logout"  onClick={handleLogout} sx={styles.txtBlack} component={RouterLink} to="/" >
        Logout
      </Button>
    </>
    
  )

  const guestLinks = (
    <>
      <Button key="Login" sx={styles.txtBlack} component={RouterLink} to="/signin">
        Signin
      </Button>
      <Button key="Register" sx={styles.txtBlack} component={RouterLink} to="/signup">
        Signup
      </Button>
    </>
  )

  const authLinksList = (
    <>
      <ListItem key="Profile" component={RouterLink} to="/profile" disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary="MyProfile" sx={styles.txtBlack} />
        </ListItemButton>
      </ListItem>
      <ListItem key="Logout" component={RouterLink} to="/" disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
          <ListItemText primary="Logout" sx={styles.txtBlack} />
        </ListItemButton>
      </ListItem>
    </>
  )

  const guestLinksList = (
    <>
      <ListItem key="Login" component={RouterLink} to="/signin" disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary="Signin" sx={styles.txtBlack} />
        </ListItemButton>
      </ListItem>
      <ListItem key="Register" component={RouterLink} to="/signup" disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary="Signup" sx={styles.txtBlack} />
        </ListItemButton>
      </ListItem>
    </>
  )

	
	const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
      <Typography variant="h6" sx={{ my: 2,color:'#000'}}>
        CRYPTO
      </Typography>
      <Divider />
      <List>
          <ListItem key="Home" component={RouterLink} to="/" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Home" sx={styles.txtBlack}/>
            </ListItemButton>
          </ListItem>
          {isAuthenticated ? authLinksList : guestLinksList}
      </List>
    </Box>
  );	
	
	const container = window !== undefined ? () => window().document.body : undefined;
	
	const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


	return <div>
		<AppBar sx={styles.appbar}>
			<Toolbar sx={styles.appbarWrap}>
				<IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={styles.icon}>
            	<MenuIcon />
          	</IconButton>
          	<Typography variant='h4' sx={styles.appbarTitle}>Crypto</Typography>
            {/*<Typography variant='p' color='primary'>Welcome {isAuthenticated ? user.first_name:'guest'}</Typography>*/}
            { isAuthenticated ? <Cart /> : ""}
          	<Box sx={styles.nav}>
              <Button key="Home" sx={styles.txtBlack} component={RouterLink} to="/">
                Home
              </Button>
              {isAuthenticated ? authLinks : guestLinks}
          </Box>
			</Toolbar>
		</AppBar>
		<Box component='nav'>		
			<Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },backgroundColor:'none',
          }}
        >
          {drawer}
        </Drawer>
		</Box>
	</div>;
}	



