import { useState } from "react";
// Material UI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { ThemeProvider } from "@mui/material/styles";
// Custom components
import ForgotPassword from "../components/ForgotPasswordForm";
import { GoogleIcon } from "../components/CustomIcons";
import { theme } from "../utils/AppTheme";
// Functions
import {
  fetchUsername,
  saveUserDetail,
  postUserDetail,
  validateInputs,
} from "../utils/LoginPage";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  // State hooks for email and password validation
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // State hook for opening the forgot password modal
  const [open, setOpen] = useState(false);

  // State hooks for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /**
   * Opens the forgot password modal
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the forgot password modal
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Makes an API call to the login endpoint and logs in the user with correct credentials.
   * @async
   */
  const handleLogin = async () => {
    try {
      const usernameQuery = await fetchUsername(email);
      const username = usernameQuery;

      const userDataQuery = await postUserDetail(username, password);
      const data = userDataQuery;

      // Store the access token in local storage
      localStorage.setItem("token", data);

      // Store UserData
      saveUserDetail();
      alert("Login successful!");

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setEmailError(true);
        setPasswordError(true);
        setPasswordErrorMessage("Invalid email or Password");
      }
      console.error(error);
    }
  };    /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password = event.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    if (
      validateInputs({
        email: email,
        password: password,
        setEmailError,
        setEmailErrorMessage,
        setPasswordError,
        setPasswordErrorMessage,
      })
    ) {
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          minHeight: "100%",
          padding: { xs: 2, sm: 4 },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            zIndex: -1,
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundRepeat: "no-repeat",
          },
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {/* Email input field */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                value={email}
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            {/* Password input field */}
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                value={password}
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {/* Forgot password modal */}
            <ForgotPassword open={open} handleClose={handleClose} />
            {/* Sign in button */}
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            {/* Sign up link */}
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          {/* Google sign in button */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
        </Card>
      </Stack>
    </ThemeProvider>
  );
}
