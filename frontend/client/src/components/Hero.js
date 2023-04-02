import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';

import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import { Link as Scroll } from 'react-scroll';



const ExpandIcons = styled(ExpandMoreIcon)(({theme}) => ({
	color:theme.palette.primary.main,
	fontSize:theme.typography.h1.fontSize,
}));

export default function Hero(){
	
	const [checked,setChecked] = useState(false);
	useEffect(()=>{
		setChecked(true);
		});
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
			justifyContent:'center',
			color:'primary.dark',	
			height:500,
		},
	}
 	return( 
 		<Collapse in={checked} {...(checked ? {timeout:1000}:{})} collapsedSize={40}>
			<Container sx={styles.hero}>
			<Typography variant='h3' sx={styles.title}>
				the decentralized <Typography variant='h3' component='span' sx={styles.yellowish}> online shopping </Typography>
			</Typography>
			<Scroll to='sliding' smooth={true}>
				<IconButton>
					<ExpandIcons />
				</IconButton>
			</Scroll>
		</Container>
	</Collapse>
	);
}