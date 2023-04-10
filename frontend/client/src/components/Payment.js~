import Layout from "components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers }  from 'ethers';
import { useSnackbar } from "notistack";
import { Stack, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material/';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';



function Payment() {
	const coinbaseapiurl = 'https://api.coinbase.com/v2/prices/ETH-INR/spot'
	
	const purchaseUrl = 'http://127.0.0.1:8000/api/products/purchase'

  const [amount, setAmount] = useState(0);

	const { token, isAuthenticated } = useSelector(state =>state.user)  
  
  const [cryptoTokens,setCryptoTokens] = useState(0);
  
  const [gasPrice,setGasPrice] = useState(0);
  
  const navigate = useNavigate()
 
  const address = "0x943eF95442fa018d84262c7e2b670EFA71Da1D63";
  
  // asan address const address = "0xF7738e001dD5c2FBba93aE5E5cfAea385B0e9737";

  const [error, setError] = useState("");

  const [transaction, setTransaction] = useState(null);

  const { enqueueSnackbar } = useSnackbar();


  const [cryptocurrency, setCryptocurrency] = useState('ETH');
  
  const [cryptowallet, setCryptowallet] = useState('metamask');

	useEffect(()=>{
		setAmount(localStorage.getItem("amount"))
		if(isAuthenticated === false)
		{
			navigate('/');
		}
	},[])			
  const handleCurrencyChange = (event) => {
    setCryptocurrency(event.target.value);
    convertToETH().then(res => {
    	const inr = parseFloat(1/res)
   	setCryptoTokens((parseFloat(amount)*inr).toFixed(6))
    });
  };

  const handleWalletChange = (event) => {
    setCryptowallet(event.target.value);
  };

  const convertToETH = async () => {
    var requestOptions = { method: "GET", redirect: "follow" };
    return fetch(`https://api.coinbase.com/v2/prices/${cryptocurrency}-INR/spot`, requestOptions)
      .then((response) => response.json())
      .then((result) => {return(result.data.amount)})
      .catch((error) => {return("error", error)});
    }


  convertToETH().then(res => {
  		const inr = parseFloat(1/res)
   	setCryptoTokens((parseFloat(amount)*inr).toFixed(6))
    //setAmount(1/parseFloat(res))
  });



  const startPayment = async (event) => {
    console.log(cryptoTokens, address);
    event.preventDefault();
    setError("");
    if(!window.ethereum){
      throw new Error("No Crypto Wallet found. Please install it first");
    }
    if(cryptocurrency === "ETH" && cryptowallet === "metamask"){
      try{
        //const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/7e41c421f4e642548d2be6cc754f52c7");
			const provider = new ethers.providers.Web3Provider(window.ethereum)        
        
			await window.ethereum.send("eth_requestAccounts",[]);        
        const signer = provider.getSigner();
        
        ethers.utils.getAddress(address);
    
        const transactionResponse = await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(cryptoTokens.toString())
        });
    
        console.log(transactionResponse);
    
        setTransaction(transactionResponse);
        axios.get(purchaseUrl,{
				headers:{
          		'Authorization': 'Bearer '+token,
        		}}).then((response)=>{
					console.log(response.data)        			
        		});
        	
        enqueueSnackbar("Order placed successfully!",{ variant: "success",anchorOrigin:{vertical:'top',horizontal:'center'}});
        navigate("/")
      
      }
      catch (error){
        setError(error.message);
        enqueueSnackbar("Payment failed!", {variant:"error",anchorOrigin:{vertical:'top',horizontal:'center'}});
        console.log("Error is :"+error)
        //navigate("/payment")
      }
    }

  //localStorage.removeItem("amount")

}
	const styles = {
		container:{ 	
			width:'90%',
		},
		trans:{
			bgcolor:'grey.100',
			marginTop:'2rem',
		},
		bg:{
			bgcolor:'grey.200',		
		},
		nobg:{
			bgcolor:'none',
		},		
	 }

  return (
     <Layout title="CryptoPayment" content="Payment">
     <Container>
     <Paper elevation={10}>
     <Container component="main" maxWidth="xs" >
        <Box spacing={2} sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CurrencyBitcoinIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crypto Payment
          </Typography>
       
      <FormControl fullWidth sx={{mt:2}}>
      <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select size='small' value={cryptocurrency} label="Currency" onChange={handleCurrencyChange}>
          <MenuItem value={'ETH'}>Etheruem</MenuItem>
          <MenuItem value={'BTC'}>Bitcoin</MenuItem>
          <MenuItem value={'SOL'}>Solana</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{mt:2}}>
      <InputLabel id="demo-simple-select-label">Wallet</InputLabel>
      <Select size='small' value={cryptowallet} label="Wallet" onChange={handleWalletChange} >
          <MenuItem value={'metamask'}>Metamask</MenuItem>
          <MenuItem value={'coinbase'}>Coinbase</MenuItem>
          <MenuItem value={'exodus'}>Exodus</MenuItem>
        </Select>
      </FormControl>
      	<Typography sx={{mt:5}} >Destination Address: {address}</Typography>
      	<Typography sx={{mt:3}} >Total Price in INR: ₹{amount}</Typography>
      	<Typography sx={{mt:3,mb:3}} >Equivalent {cryptocurrency} Tokens: {cryptoTokens} eth</Typography> 
      <Button sx={{mb:5}} onClick={startPayment} variant='contained'>Proceed to Pay</Button>
    </Box>
    </Container>
    </Paper>
    </Container>
        
        {console.log(transaction)}

        {/*error && <div>{JSON.stringify(error)}</div>*/}

	</Layout>
  )
}

export default Payment