import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { deleteFavoriteStock } from '../../utils/Dashboard';

type FavoriteStockCardType = {
    name: string;
    code: string;
    dateAdded: Date;
    uuid: string;
}
const FavoriteStockCard = ({name, code, dateAdded, uuid,}: FavoriteStockCardType) => {
const [refresh, setRefresh] = useState(false);

const navigate = useNavigate();

  const handleDelete = (uuid: string) => {
    // Implement delete functionality here
    deleteFavoriteStock(uuid);
    setRefresh((prev) => !prev);  
  };

  return ( 
    <Card
      sx={{
        maxWidth: 345,
        margin: '1rem',
        boxShadow: 3,
        borderRadius: 2,
      }}
      
      key={uuid}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
        >
          Code: {code}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Date Added: {new Date(dateAdded).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{color: 'red'}} onClick={()=> handleDelete(uuid)}>Remove</Button>
        <Button size="small" sx={{color: 'blue'}} onClick={()=> navigate(`/stock/${code}`)}>View</Button>
      </CardActions>
    </Card>
  );
};

export default FavoriteStockCard;