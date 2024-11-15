import {Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        // For example, clear user session or token
        // Redirect to login page or perform any other necessary actions
        localStorage.removeItem('token');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        navigate("/login");

    };

  return (
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100vh" width="100vw">
        <div>Are you sure you want to logout?</div> 
        <Button variant="contained" color="primary" onClick={handleLogout} sx={{margin: '5px'}}>Logout</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Cancel</Button>
    </Box>
  )
}

export default Logout