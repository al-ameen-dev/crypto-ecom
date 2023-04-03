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
    				<Grid container spacing={3} direction='row'>			
						<Grid item xs={12} md={6} >
							<Paper elevation={1}>					
								<UserInfo />
							</Paper>				
						</Grid>
						<Grid item xs={12} md={6} >
							<OrderHistory />
						</Grid>
					</Grid>
    			</Container>
		</Layout>
   )
}

export default Profile;