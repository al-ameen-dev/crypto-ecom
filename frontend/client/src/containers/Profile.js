import Layout from "components/Layout";
import OrderHistory from "components/OrderHistory";
import UserInfo from "components/UserInfo";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const Profile = () =>{
    return(
        <Layout title="Profile" content="Dashboard Page">
    			<CssBaseline />
   	 		<Container>
   	 			<Paper elevation={10} sx={{width:"100%"}}>
    				<Grid container spacing={2} direction='row'>			
						<Grid item sx={{width:"70%"}} xs={12} md={6} >					
								<UserInfo />
										
						</Grid>
						<Grid item xs={12} md={6} >
							<OrderHistory />
						</Grid>
					</Grid>
					</Paper>	
    			</Container>
		</Layout>
   )
}

export default Profile;