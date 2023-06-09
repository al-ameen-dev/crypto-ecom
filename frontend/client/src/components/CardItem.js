import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useSnackbar } from 'notistack';

import { useState } from 'react';

export default function CardItem({name, price, imgurl, product_description ,item}) {
	
	const cartUrl = 'http://127.0.0.1:8000/api/products/cart'
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [itemdata,setItemdata] = useState(item)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, isAuthenticated } = useSelector(state =>state.user)  
  
  const handleAddCart = (event) =>{
  		if(isAuthenticated === true)
  		{
  			const addData = {
				name:itemdata.name,
				price:itemdata.price,
				imgurl:itemdata.imgurl,
				product_description:itemdata.product_description
			}
			axios.post(cartUrl,addData,{
				headers:{
					'Authorization':'Bearer '+token,			
				}}).then((response)=>{
					//alert(response.data.message)
				enqueueSnackbar(response.data.message,{ variant: "success",anchorOrigin:{vertical:'top',horizontal:'center'}})
			}).catch((error)=>{
				console.log(error)
			})
  		}
		else{
			alert("you need to signin first to add to the cart")
			navigate("/signin")		
		}
	}  
  
  const styles = {
		img:{
			height:'10rem',
			width:'15rem',		
		},
		center:{
			display:'flex',
			justifyContent:'center',
			alignItems:'center',		
		}
  }
  return (
    <Card sx={{ maxWidth: 250,margin:2.5 }}>
      <CardMedia style={styles.img} component="img" alt="green iguana" height="150" width="90" image={imgurl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant='h6' component='body'> ₹{price}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product_description}
        </Typography>
      </CardContent>
      <CardActions sx={styles.center}>
        <Button onClick={handleAddCart} size="small" variant='contained'>Add To Cart<AddShoppingCartOutlinedIcon /></Button>
      </CardActions>
    </Card>
  );
}