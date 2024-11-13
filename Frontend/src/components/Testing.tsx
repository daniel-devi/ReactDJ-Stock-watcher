import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, Card, CardHeader, CardContent, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import API from '../utils/API';

// API Key and Base URL
const POLYGON_API_KEY = 'dLepHY8FNSKm91PgFpahLMGbRLEGhboQ';
const POLYGON_BASE_URL = 'https://api.polygon.io/v3/reference/tickers';

// Define types for API responses
interface FavoriteStock {
  stock: string;
}

interface SearchResult {
  name: string;
  ticker: string;
  market: string;
  locale: string;
}

// Fetch favorite stocks from the backend
const fetchFavorites = async (): Promise<string[]> => {
  const response = await API.get<FavoriteStock[]>('/api/favorites');
  return response.data.map(item => item.stock);
};

// Add stock to favorites on the backend
const addFavoriteStock = async (stock: string): Promise<void> => {
  await API.post('/api/favorites', { stock });
};

// Fetch stock data from Polygon.io API based on the search term
const fetchStockSearchResults = async (searchTerm: string): Promise<SearchResult[]> => {
  const response = await API.get(`${POLYGON_BASE_URL}`, {
    params: {
      search: searchTerm,
      apiKey: POLYGON_API_KEY,
    },
  });
  return response.data.results;
};

// Stock Favorites List Component
const StockFavoritesList: React.FC = () => {
  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites
  });

  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites.</p>;

  return (
    <Card>
      <CardHeader title="My Favorite Stocks" />
      <CardContent>
        {favorites.length > 0 ? (
          <List>
            {favorites.map((stock: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={stock} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box>You haven't added any favorite stocks yet. Use the search form to add some!</Box>
        )}
      </CardContent>
    </Card>
  );
};

// Stock Search Form Component
const StockSearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use TanStack Query to fetch search results
  const { data: searchResults = [], refetch, isLoading: isSearching } = useQuery({
    queryKey: ['stockSearch', searchTerm],
    queryFn: () => fetchStockSearchResults(searchTerm),
    enabled: false
  });

  // Mutation for adding a stock to favorites
  const addToFavoritesMutation = useMutation({
    mutationFn: addFavoriteStock,
    onSuccess: () => {
        console.log('Stock added to favorites!');
    }
  });

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm) refetch();
  };

  // Handle adding a stock to favorites
  const handleAddToFavorites = (stock: string) => {
    addToFavoritesMutation.mutate(stock);
  };

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
          <Button variant="contained" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </Box>
        {searchResults.length > 0 && (
          <Box mt={2}>
            <Box fontWeight="medium">Search Results:</Box>
            <List>
              {searchResults.map((stock: SearchResult, index: number) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`${stock.name} (${stock.ticker})`}
                    secondary={`Market: ${stock.market} - Locale: ${stock.locale}`}
                  />
                  <Button variant="contained" onClick={() => handleAddToFavorites(stock.ticker)}>
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

const StockFavoritesApp: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <StockFavoritesList />
      <StockSearchForm />
    </Box>
  );
};

export default StockFavoritesApp;