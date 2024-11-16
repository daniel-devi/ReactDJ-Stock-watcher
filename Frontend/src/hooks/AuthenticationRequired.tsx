import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../utils/CONSTANT";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import API from "../utils/API";

function AuthenticationRequired({ page }: { page: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // State to track authorization status
  const navigate = useNavigate(); // Hook to navigate pages

  useEffect(() => {
    // Call the auth function when the component mounts
    auth().catch(() => setIsAuthorized(false));
  }, []);

  // Function to refresh the access token using the refresh token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get the refresh token from local storage
    try {
      const res = await API.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        // If the response is successful, update the access token
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // Function to check the authentication status asynchronously
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Get the access token from local storage
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token); // Decode the token to get its expiration time
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      // If the token has expired, attempt to refresh it
      await refreshToken();
    } else {
      setIsAuthorized(true); // If the token is still valid, authorize the user
    }
  };

  if (isAuthorized === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    ); // Show loading spinner while checking authentication
  }

  if (isAuthorized) {
    return <>{page}</>; // Render the page if authorized
  } else {
    return (
      <>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRadius: "8px",
            boxShadow: 3,
            width: "100vw",
            height: "100vh",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Please log in to continue
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            paragraph
          >
            You need to sign in to access this page. If you don't have an
            account, please register first.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{ padding: "10px" }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{ padding: "10px" }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </>
    );
  }
}

export default AuthenticationRequired;
