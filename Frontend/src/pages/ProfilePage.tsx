import API from "../utils/API";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const ProfilePage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [dateJoined, setDateJoined] = useState<string | null>("");

  const navigate = useNavigate();

  const getUserDetail = async (): Promise<void> => {
    try {
      // Get user details from server
      const response = await API.get("/account/detail");
      // Set user details in state
      setEmail(response.data.email);
      const date = new Date(response.data.date_joined);
      setDateJoined(date.toLocaleDateString());
    } catch (e) {
      console.log(e);
    }
  };

  getUserDetail();

  const user = {
    name: localStorage.getItem("UserName"),
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 72, height: 72 }}
              />
            }
            title={<Typography variant="h5">{user.name}</Typography>}
            subheader={
              <Typography color="text.secondary">
                Joined: {dateJoined}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              EMAIL: {email}
            </Typography>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
