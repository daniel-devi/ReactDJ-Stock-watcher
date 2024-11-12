import { useState, useEffect } from "react";
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

const StockData = () => {
  const [stockData, setStockData] = useState<StockDataType[]>([]);
  const [latestData, setLatestData] = useState<StockDataType | null>(null);
  const [headerData, setHeaderData] = useState<HeaderDataType | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=LPLVY2O4QNXS8VK9&outputsize=compact`
        );
        const data = await response.json();
        setHeaderData(data);

        console.log(data);

        const formattedData = Object.keys(data["Time Series (Daily)"])
          .slice(0, 30)
          .map((date) => ({
            time: date,
            close: parseFloat(data["Time Series (Daily)"][date]["4. close"]),
            open: parseFloat(data["Time Series (Daily)"][date]["1. open"]),
            high: parseFloat(data["Time Series (Daily)"][date]["2. high"]),
            low: parseFloat(data["Time Series (Daily)"][date]["3. low"]),
            volume: parseFloat(data["Time Series (Daily)"][date]["5. volume"]),
          }));

        setStockData(formattedData);
        setLatestData(formattedData[0]);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader title="Latest Stock Data" />
        <CardContent>
          {latestData && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="h6">
                  {headerData?.["Meta Data"]?.["2. Symbol"]}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Latest Close
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${latestData.close.toFixed(2)}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Open
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${latestData.open.toFixed(2)}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  High
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${latestData.high.toFixed(2)}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Low
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${latestData.low.toFixed(2)}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Volume
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {latestData.volume.toLocaleString()}
                </Typography>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default StockData;
