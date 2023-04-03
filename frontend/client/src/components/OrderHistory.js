import Layout from "components/Layout";
import OrderHistory from "components/OrderHistory";
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
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useImmer } from 'use-immer';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Profile = () =>{
	
	const historyUrl = 'http://127.0.0.1:8000/api/products/purchasehistory';
	
	const { token } = useSelector(state=>state.user);
	
	const [purchaseHistory,setPurchaseHistory] = useState([])
	
	useEffect(()=>{
		axios.get(historyUrl,{headers:{
    		"Authorization":"Bearer "+token
    	}}).then((response)=>{
			setPurchaseHistory(response.data)
			console.log(response.data)
    	}).catch((error)=>{
    		console.log(error)
    })
		
	},[])
	
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		  [`&.${tableCellClasses.head}`]: {
    		backgroundColor: theme.palette.grey[500],
    		color: theme.palette.common.black,
  		},
  		[`&.${tableCellClasses.body}`]: {
    		fontSize: 14,
  		},
		}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  		'&:nth-of-type(odd)': {
    		backgroundColor: theme.palette.action.hover,
  		},
  // hide last border
  		'&:last-child td, &:last-child th': {
    	border: 0,
  		},
		}));

    return(
     		<>			
				<Box sx={{ display: 'flex',mr:3,ml:3,flexDirection: 'column',alignItems: 'center',}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        				<HistoryEduIcon />
        			</Avatar>
        			<Typography component="h1" variant="h5">
            		Order History
        			</Typography>
        		</Box>
				<Box component="form"  sx={{ mt: 3 }}>
					<TableContainer component={Paper}>
      				<Table sx={{ minWidth: 300 }} aria-label="customized table">
        					<TableHead>
          					<TableRow>
            					<StyledTableCell>Product Name</StyledTableCell>
            					<StyledTableCell align="right">Product Price</StyledTableCell>
            					<StyledTableCell align="right">Purchased At</StyledTableCell>
          					</TableRow>
        					</TableHead>
        					<TableBody>
          					{purchaseHistory.map((row) => (
            					<StyledTableRow key={row.id}>
              						<StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              						<StyledTableCell align="right">{row.price}</StyledTableCell>	
										<StyledTableCell align="right">{row.purchased_at}</StyledTableCell>
            					</StyledTableRow>
          					))}
        					</TableBody>
      				</Table>
    				</TableContainer>
    			</Box>
			</>
    )
}

export default Profile;