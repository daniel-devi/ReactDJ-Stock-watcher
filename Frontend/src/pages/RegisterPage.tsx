import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import SignUpContainer from "../components/RegisterPage/SignUpContainer";
import SignUpCard from "../components/RegisterPage/SignUpCard";
import { validateEmail, validatePassword, signUpUser } from "../utils/RegisterPage";

function SignUp () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleValidation = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(isEmailValid ? null : "Please enter a valid email address.");
    setPasswordError(isPasswordValid ? null : "Password must be at least 8 characters and contain at least one uppercase letter.");
    
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const isSignedUp = await signUpUser(email, password);
      if (isSignedUp) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer>
        <SignUpCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
          handleSubmit={handleSubmit}
        />
      </SignUpContainer>
    </>
  );
};

export default SignUp;
