import { useMutation } from "@tanstack/react-query";
import API from "./API";

/**
 * API configuration constants
 * POLYGON_API_KEY: Authentication key for Polygon.io API
 * POLYGON_BASE_URL: Base URL for Polygon.io tickers endpoint
 */
const POLYGON_API_KEY = "dLepHY8FNSKm91PgFpahLMGbRLEGhboQ";
const POLYGON_BASE_URL = "https://api.polygon.io/v3/reference/tickers";

/**
 * Interface representing a favorite stock in the system
 * @interface FavoriteStock
 * @property {string} stock - The stock symbol/ticker
 */
interface FavoriteStock {
  stock: string;
}

/**
 * Interface representing a search result from Polygon.io API
 * @interface SearchResult
 * @property {string} name - Company name
 * @property {string} ticker - Stock symbol
 * @property {string} market - Market where the stock is traded
 * @property {string} locale - Geographic locale of the stock
 */
interface SearchResult {
  name: string;
  ticker: string;
  market: string;
  locale: string;
}


/**
 * Fetches the list of favorite stocks from the backend
 * @async
 * @returns {Promise} Array of stock symbols
 */
const fetchFavorites = async (): Promise<FavoriteStock[]> => {
  const response = await API.get<FavoriteStock[]>("/api/favorite-stocks");
  return response.data;
};

export default fetchFavorites;

/**
 * Adds a stock to the favorites list in the backend
 * @async
 * @param {string} stock - Stock symbol to add to favorites
 * @returns {Promise<void>}
 */
const addFavoriteStock = async (stock: string): Promise<void> => {
  await API.post("/api/favorite-stocks", { stock });
};

/**
 * Fetches stock search results from Polygon.io API
 * @async
 * @param {string} searchTerm - Search query for finding stocks
 * @returns {Promise<SearchResult[]>} Array of search results
 */
const fetchStockSearchResults = async (
  searchTerm: string
): Promise<SearchResult[]> => {
  const response = await API.get(`${POLYGON_BASE_URL}`, {
    params: {
      search: searchTerm,
      apiKey: POLYGON_API_KEY,
    },
  });
  return response.data.results;
};

/**
 * Helper function to validate stock symbol format
 * @param {string} symbol - Stock symbol to validate
 * @returns {boolean} Whether the symbol is valid
 */
const isValidStockSymbol = (symbol: string): boolean => {
  return /^[A-Z]{1,5}$/.test(symbol);
};

/**
 * Helper function to format search results
 * @param {SearchResult[]} results - Raw search results
 * @returns {SearchResult[]} Formatted search results
 */
const formatSearchResults = (results: SearchResult[]): SearchResult[] => {
  return results.filter((result) => result.locale === "us");
};

export {
  addFavoriteStock,
  fetchStockSearchResults,
  isValidStockSymbol,
  formatSearchResults,
};
