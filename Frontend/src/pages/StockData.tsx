import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

// Interfaces for data types
interface StockDataType {
  time: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

interface HeaderDataType {
  "Meta Data": {
    "2. Symbol": string;
  };
}

// Fetches stock data from the API
const useStockData = (symbol: string) => {
  const [stockData, setStockData] = useState<StockDataType[]>([]);
  const [latestData, setLatestData] = useState<StockDataType | null>(null);
  const [headerData, setHeaderData] = useState<HeaderDataType | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=LPLVY2O4QNXS8VK9&outputsize=compact`
        );
        const data = await response.json();
        console.log(data);

        if (data["Time Series (Daily)"] && data["Meta Data"]) {
          setHeaderData(data);

          const formattedData = Object.keys(data["Time Series (Daily)"])
            .slice(0, 30) // Get the most recent 30 days of data
            .map((date) => ({
              time: date,
              close: parseFloat(data["Time Series (Daily)"][date]["4. close"]),
              open: parseFloat(data["Time Series (Daily)"][date]["1. open"]),
              high: parseFloat(data["Time Series (Daily)"][date]["2. high"]),
              low: parseFloat(data["Time Series (Daily)"][date]["3. low"]),
              volume: parseFloat(data["Time Series (Daily)"][date]["5. volume"]),
            }));

          setStockData(formattedData);
          setLatestData(formattedData[0]); // Set the latest data (most recent day)
        } else {
          console.error("Invalid API response structure.");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return { stockData, latestData, headerData };
};

// Component for displaying the latest stock data
const StockDetails = ({
  latestData,
  headerData,
}: {
  latestData: StockDataType | null;
  headerData: HeaderDataType | null;
}) => (
  <Card>
    <CardHeader title="Latest Stock Data" />
    <CardContent>
      {latestData ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="h6">
              {headerData?.["Meta Data"]?.["2. Symbol"] || "N/A"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Latest Close
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              ${latestData.close.toFixed(2)}
            </Typography>
          </div>
          {["open", "high", "low", "volume"].map((key) => (
            <div key={key}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {key === "volume"
                  ? latestData.volume.toLocaleString()
                  : `$${latestData[key as keyof StockDataType]?.toFixed(2)}`}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No data available.
        </Typography>
      )}
    </CardContent>
  </Card>
);

// Component for rendering the stock price chart
const StockChart = ({ stockData }: { stockData: StockDataType[] }) => (
  <Card>
    <CardHeader title="Stock Price Chart" />
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stockData}>
          <XAxis dataKey="time" />
          <YAxis type="number" domain={["dataMin", "dataMax"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Main StockData component
const StockData = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { stockData, latestData, headerData } = useStockData(symbol!);

  return (
    <div className="flex flex-col gap-4">
      <StockDetails latestData={latestData} headerData={headerData} />
      <StockChart stockData={stockData} />
    </div>
  );
};

export default StockData;
