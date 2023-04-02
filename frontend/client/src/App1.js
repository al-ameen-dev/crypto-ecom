import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import RegisterPage from 'containers/RegisterPage';
import Profile from 'containers/Profile';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';

import { styled, alpha } from '@mui/material/styles';
import { Link as Scroll } from 'react-scroll';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from 'features/store';
import { useState, useEffect } from 'react'
import Payment from "components/Payment";

export default function App(){
	
	//const [checked,setChecked] = useState(false);
	//useEffect(()=>{
		//setChecked(true);
	//	});
		
		//<ExpandMoreIcon sx={styles.goDown} />
	const styles = {
		title:{
			color:'primary.dark',		
		},
		yellowish:{
			color:'#223443',		
		},
		goDown:{
			color:'primary.main',
			fontSize:'5rem',	
		},
		hero:{
			display:'flex',
			flexDirection:'column',
			alignItems:'center',
			background:'none',
			justifyContent:'center',
			height:500,
		},
	}
	
	return (
		<Provider store={store}>
				<CssBaseline />
				<Toolbar />
				<Routes>
          		<Route path="/" element={<HomePage />} />
          		<Route path="/signin" element={<LoginPage />} />
          		<Route path="/signup" element={<RegisterPage />} />
          		<Route path="/profile" element={<Profile />} />
          		<Route path="/payment" element={<Payment />} />
          		<Route path="*" element={<Navigate to="/" replace />} />
        		</Routes>
		</Provider>	
	)
	
}