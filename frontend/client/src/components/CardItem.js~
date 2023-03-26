import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import { useState } from 'react';

export default function CardItem({name, price, imgurl, product_description ,item}) {
	
	const addCartUrl = 'http://127.0.0.1:8000/api/products/addtocart'
  
  const [itemdata,setItemdata] = useState(item)
  const navigate = useNavigate()
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
			axios.post(addCartUrl,addData,{
				headers:{
					'Authorization':'Bearer '+token,			
				}}).then((response)=>{
				alert(response.data.message)
			}).catch((error)=>{
				console.log(error)
			})
  		}
		else{
			alert("you need to login first to add to the cart")
			navigate("/login")		
		}
	}  
  
  const styles = {
		img:{
			height:'1.5rem',
			width:'2rem',		
		}  
  }
  return (
    <Card sx={{ maxWidth: 250,margin:2.5 }}>
      <CardMedia style={styles} component="img" alt="green iguana" height="150" width="50" image={imgurl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant='h6' component='body'>{price} ₹</Typography>
        <Typography variant="body2" color="text.secondary">
          {product_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddCart} size="small" variant='outlined'>Add To Cart<AddShoppingCartOutlinedIcon /></Button>
      </CardActions>
    </Card>
  );
}