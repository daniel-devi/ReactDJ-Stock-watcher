import React from "react";
import { Box, Typography, Divider, Button, Link, FormControl, FormLabel, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SocialSignUpButtons from "../RegisterPage/SignUpButtons";

interface SignUpCardProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  emailError: string | null;
  passwordError: string | null;
  handleSubmit: () => void;
}

const Card = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(4),
  backgroundColor: "white",
  borderRadius: theme.spacing(1),
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SignUpCard: React.FC<SignUpCardProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  handleSubmit,
}) => (
  <Card>
    <Typography variant="h4" sx={{ fontSize: "2rem", textAlign: "center" }}>Register</Typography>
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <TextField
          required
          fullWidth
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <TextField
          required
          fullWidth
          type="password"
          placeholder="••••••••••"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </FormControl>
      <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
    </Box>
    <Divider>or</Divider>
    <SocialSignUpButtons />
    <Typography sx={{ textAlign: "center" }}>
      Already have an account? <Link href="/login" variant="body2">Sign in</Link>
    </Typography>
  </Card>
);

export default SignUpCard;
