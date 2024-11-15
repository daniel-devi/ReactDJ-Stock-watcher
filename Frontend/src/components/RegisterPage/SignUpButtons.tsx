import React from "react";
import { Button, Box } from "@mui/material";
import { GoogleIcon } from "../LoginPage/CustomIcons";

const SocialSignUpButtons: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={() => alert("Sign up with Google")}
    >
      Sign up with Google
    </Button>
  </Box>
);

export default SocialSignUpButtons;
