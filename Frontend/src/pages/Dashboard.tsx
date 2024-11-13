import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import StockFavoritesApp from "../components/Testing";

function Dashboard() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-indigo-50">
        <Header />
      </div>
      <StockFavoritesApp />
    </QueryClientProvider>
  );
}
export default Dashboard;