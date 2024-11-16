import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchStockSearchResults } from "../../utils/Dashboard";
import { addFavoriteStock } from "../../utils/Dashboard";
import { checkStockCodeAlreadyExists } from "../../utils/Dashboard";
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
  const [trigger, setTrigger] = useState(false);

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
  const handleAddToFavorites = (ticker: string, name: string) => {
    // Call the mutation function
    const favoriteData = {
      name: name,
      code: ticker,
      user: Number(localStorage.getItem("UserId")) || "",
    };
    addToFavoritesMutation.mutate(favoriteData);
    setTrigger((prev) => !prev); // Update state to cause a rerender
  };
  /**
   * Handles the search action
   * Note: searchTerm and refetch need to be defined in the component where this is used
   */
  // Use TanStack Query to fetch search results
  const {
    data: searchResults = [],
    isLoading: isSearching,
    refetch,
  } = useQuery({
    queryKey: ["stockSearch", searchTerm],
    queryFn: () => fetchStockSearchResults(searchTerm),
    enabled: false,
  });

  const handleSearch = () => {
    if (searchTerm) {
      refetch();
    }
  };

  return (
    <Card>
      <CardHeader title="Search for your Favorite Stocks" />
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
        {searchResults.length > 0 ? (
          <Box mt={2}>
            <Box fontWeight="medium">Search Results:
            <Button variant="contained" sx={{margin: '0 2px', color: 'red'}} >X</Button>
            </Box>
            <List>
              {searchResults.map((stock: any, index: number) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`${stock.name} - ${stock.ticker}`}
                    secondary={`Market: ${stock.market} - Locale: ${stock.locale}`}
                  />

                  {!checkStockCodeAlreadyExists(stock.ticker) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        handleAddToFavorites(stock.ticker, stock.name)
                      }
                      disabled={
                        !checkStockCodeAlreadyExists(stock.ticker)
                          ? false
                          : true
                      }
                    >
                      Add to Favorites
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary" disabled>
                      Already in Favorites
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box mt={2}>
            <Box fontWeight="medium">Search Results:</Box>
            <List>
              <ListItem divider>
                <ListItemText primary="No results found." />
              </ListItem>
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StockSearchForm;
