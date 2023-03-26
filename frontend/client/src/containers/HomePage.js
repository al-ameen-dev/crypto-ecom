import Layout from "components/Layout";
import Container from "@mui/material/Container";
import Hero from 'components/Hero';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import CardItem from 'components/CardItem';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { useState, useEffect } from 'react';
import axios from 'axios';


const HomePage = () =>{
	
	const [search,setSearch] = useState('');
	const [products,setProducts] = useState([])
	const [minRange,setMinRange] = useState(200)
	const [maxRange,setMaxRange] = useState(4000)
	const [step,setStep] = useState(100)
	const [category,setCategory] = useState('watch')
	const [price,setPrice] = useState('')	
	
	const productsurl = 'http://127.0.0.1:8000/api/products/all'
	const categoryurl = 'http://127.0.0.1:8000/api/products/'
	useEffect(() =>{
				axios.get(categoryurl+category).then((response)=>{
				setProducts(response.data)
				console.log(products)
			}).catch((error)=>{
				console.log(error)
			})
	}, [])
	const handleRadioChange = (event)=>{
			setCategory(event.target.value)
			axios.get(categoryurl+event.target.value).then((response)=>{
				setProducts(response.data)
				console.log(products)
			}).catch((error)=>{
				console.log(error)
			})
	}
	
	const handlePriceBelow = (event) =>{
		
		axios.get(categoryurl+category+'/'+price).then((response)=>{
				setProducts(response.data)
				console.log(response.data)
			}).catch((error)=>{
				console.log(error)
			})
	}
	const handlePriceInput = (event) =>{
		setPrice(event.target.value)
	}
	const handleSearch = (event)=>{
		setSearch(event.target.value)
		axios.get(categoryurl+category+'/'+search).then((response)=>{
				setProducts(response.data)
				console.log(products)
			}).catch((error)=>{
				console.log(error)
			})	
	}
	function valuetext(value) {
  		return `${value} ₹`;
	}
	 const styles = {
		container:{ 	
			width:'90%',
		},
		trans:{
			bgcolor:'grey.100',
			marginTop:'2rem',
		},
		holder:{
			display:'flex',
			flexDirection:'row',
			flexWrap:'wrap',
			alignItems:'center',
		},
		itemSearch:{
			background:'none',
			elevation:0,
	
		},
		emptyGrid:{
			height:'100%',
			width:'100%',		
		},
		
	 }
	 //inputProps={{ 'aria-label': 'search google maps' }}
    return(
        <Layout title="Home" content="Home Page">
				<Hero />
				<Box id='sliding' height={55}/>        		
        		<Container sx={styles.trans}>
        			<Grid container spacing={2} direction='row'>
						<Grid item xs={12} md={3} >
							<Paper elevation={10}>	
								<InputBase onChange={handleSearch} sx={{ ml: 1, flex: 1 }} placeholder="Search Products" inputProps={{ 'aria-label': 'search products' }}/>
      						<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        							<SearchIcon />
     	 						</IconButton>
     	 					</Paper>
     	 					<Divider sx={{mt:4}}/>
     	 					<Typography variant='h5'>Filters</Typography>
     	 					<Typography variant='h6' sx={{mt:1}}>Categories</Typography>
     	 					<FormControl>
      						<RadioGroup onChange={handleRadioChange} aria-labelledby="demo-radio-buttons-group-label" defaultValue={category} name="radio-buttons-group">
        							<FormControlLabel value="watch" control={<Radio />} label="Watch" />
        							<FormControlLabel value="cloth" control={<Radio />} label="Cloths" />
        							<FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
      						</RadioGroup>
    						</FormControl>
    						<Divider sx={{mt:4}}/>
     	 					<Typography variant='h6' sx={{mt:1}}>Price₹  Below</Typography>
							<Paper elevation={10}>							 
							 	<InputBase sx={{ ml: 1 }} onChange={handlePriceInput} placeholder="price" value={price} id='pricebelow' inputProps={{ 'aria-label': 'price' }}/>
								<IconButton onClick={handlePriceBelow} type="button" sx={{ p: '10px' }} aria-label="search">
        							<SearchIcon />
     	 						</IconButton>						
							</Paper>     	 					
     	 					
						</Grid>
						
						<Grid container xs={12} md={9} direction='row'>
 							{products.map(item=>(
							<CardItem key={item.id} name={item.name} price={item.price} imgurl={item.imgurl} product_description={item.product_description} item={item}/>
							))}
						</Grid>        			
        			</Grid>
            </Container>
        </Layout>
    )
}

export default HomePage;