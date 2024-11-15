import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import Header from "../components/Header";
import StockFavoritesList from "../components/Dashboard/StockFavoritesList";
import StockSearchForm from "../components/Dashboard/StockSearchForm";

function Dashboard() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <Box display="flex" flexDirection="column" gap={2}>
        <StockFavoritesList />
        <StockSearchForm />
      </Box>
    </QueryClientProvider>
  );
}
export default Dashboard;
