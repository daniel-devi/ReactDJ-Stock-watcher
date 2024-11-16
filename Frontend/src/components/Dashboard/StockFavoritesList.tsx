import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import fetchFavorites from "../../utils/Dashboard";
import FavoriteStockCard from "./FavouriteCard";

// Stock Favorites List Component
const StockFavoritesList: React.FC = () => {

  const { data: favorites = [], error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });

  const favoriteResult = favorites.map((item) => Object.values(item));


  if (error) return <p>Error loading favorites.</p>;

  return (
    <Card sx={{ marginTop: 2 }} sx={{ marginTop: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <CardHeader title="My Favorite Stocks" />
      <CardContent>
        {favoriteResult.length > 0 ? (
          <Box flexDirection={'row'}>
            {favoriteResult.map((list: string[], index: number) => (
              <Box key={index}>  
                <FavoriteStockCard name={list[2]} code={list[3]} dateAdded={new Date(list[4])}/>            
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            You haven't added any favorite stocks yet. Use the search form to
            add some!
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StockFavoritesList;
