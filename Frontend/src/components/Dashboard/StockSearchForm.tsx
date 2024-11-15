import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchStockSearchResults from "../../utils/Dashboard";
import { addFavoriteStock } from "../../utils/Dashboard";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

// Stock Search Form Component
const StockSearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Creates a mutation hook for adding stocks to favorites
   * Note: This should be moved to a React component or custom hook
   */
  const addToFavoritesMutation = useMutation({
    mutationFn: addFavoriteStock,
    onSuccess: () => {
      console.log("Stock added to favorites!");
    },
  });

  /**
   * Handles the action of adding a stock to favorites
   * @param {string} stock - Stock symbol to add to favorites
   */
  const handleAddToFavorites = (stock: string) => {
    addToFavoritesMutation.mutate(stock);
  };

  /**
   * Handles the search action
   * Note: searchTerm and refetch need to be defined in the component where this is used
   */
  // Use TanStack Query to fetch search results
  const { data: searchResults = [], isLoading: isSearching, refetch } = useQuery({
    queryKey: ["stockSearch", searchTerm],
    queryFn: () => fetchStockSearchResults(searchTerm),
    enabled: false,
  });
  
  const handleSearch = () => {
  if (searchTerm) {
     refetch();
     console.log(searchResults);
  }
}

    return (
      <Card>
        <CardHeader title="Search for Stocks" />
        <CardContent>
          <Box display="flex" gap={2}>
            <TextField
              placeholder="Enter stock symbol or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </Box>
          {searchResults.length > 0 && (
            <Box mt={2}>
              <Box fontWeight="medium">Search Results:</Box>
              <List>
                {searchResults.map((stock: any, index: number) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`${stock.name}`}
                      secondary={`Market: ${stock.market} - Locale: ${stock.locale}`}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleAddToFavorites(stock.ticker)}
                    >
                      Add to Favorites
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

export default StockSearchForm;
