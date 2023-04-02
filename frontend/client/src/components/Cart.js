import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [items,setItems] = useState([]);
  const [total,setTotal] = useState(0)
  const navigate = useNavigate()
  const { token } = useSelector(state=>state.user);
  const cartUrl = 'http://127.0.0.1:8000/api/products/cart';
  const cartDeleteUrl = 'http://127.0.0.1:8000/api/products/cart/delete/'
  useEffect(()=>{
  		items.map(item=>setTotal((prevState)=>prevState+parseInt(item.price)))
  },[items])
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(cartUrl,{headers:{
    	"Authorization":"Bearer "+token
    }}).then((response)=>{
		setItems(response.data)
		console.log(response.data)
    }).catch((error)=>{
    	console.log(error)
    })
  };
  const handleClose = () => {
    setOpen(false);
    setTotal(0)
  };
  
  const handleDelete = (id) =>{
  			console.log(id)
		  axios.delete(cartDeleteUrl+id,{headers:{
    		"Authorization":"Bearer "+token
    		}}).then((response)=>{
			console.log("deleted succes")
			axios.get(cartUrl,{headers:{
    	"Authorization":"Bearer "+token
    }}).then((response)=>{
    	setTotal(0)
		setItems(response.data)
		console.log(response.data)
    }).catch((error)=>{
    	console.log(error)
    })
    	}).catch((error)=>{
    		console.log(error)
    })
  };
  
  const handlePayment = ()=>{
		localStorage.setItem("amount",total);
		navigate("/payment");
  }

  return (
    <>
        <IconButton sx={{textTransform:'none'}} onClick={handleClickOpen} color="primary" aria-label="add to shopping cart">
        		<ShoppingCartOutlinedIcon /> Cart
        </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth='xl'
        maxWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cart
        </BootstrapDialogTitle>
        <DialogContent dividers>
        		{items.map(item=>(
        		<Container key={item.id} sx={{display:'flex' , flexDirection:'row',p:1}}>
        		<img height='65px' width='65px' src={item.imgurl} />
        		<Divider orientation="vertical" sx={{m:3}} flexItem />
        		<Typography gutterBottom >
           		{item.name}
          	</Typography>
          	<Divider orientation="vertical" sx={{m:3}} flexItem />
          	<Typography gutterBottom sx={{flexGrow:1}}>
           				₹{item.price}
          	</Typography>
          	<Divider orientation="vertical" sx={{m:3}} flexItem />
          	<IconButton onClick={()=>handleDelete(item.id)} value={item.id} color="primary" aria-label="add to shopping cart">
        			<DeleteOutlineOutlinedIcon fontSize='small'/> <Typography fontSize='small'>Remove Item</Typography>
        		</IconButton>
          	</Container>))}
        </DialogContent>
        <DialogActions>
        	<Container sx={{display:'flex',direction:'row'}}>
        		<Typography>
           		Total Amount : 
          	</Typography>
        		<Typography>
           				₹{total}
          	</Typography>
          </Container>
          <Button variant='contained' autoFocus onClick={handlePayment}>
            <ShoppingCartCheckoutIcon />Checkout
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}