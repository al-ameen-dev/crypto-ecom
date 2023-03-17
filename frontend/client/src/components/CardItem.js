import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function CardItem({name, price, imgurl, product_description}) {
  
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}