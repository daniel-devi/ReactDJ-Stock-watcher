import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  padding: theme.spacing(2),
}));

export default SignUpContainer;
