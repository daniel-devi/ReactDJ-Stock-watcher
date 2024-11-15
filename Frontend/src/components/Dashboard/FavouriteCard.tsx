
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

type FavoriteStockCardType = {
    name: string;
    code: string;
    dateAdded: Date;
}

const FavoriteStockCard = ({name, code, dateAdded}: FavoriteStockCardType) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '1rem',
        boxShadow: 3,
        borderRadius: 2,
      }}
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
      </CardActions>
    </Card>
  );
};

export default FavoriteStockCard;