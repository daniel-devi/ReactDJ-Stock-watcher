import axios from "axios";

/**
 * Validates an email address format
 * @param email - The email string to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

/**
 * Validates password requirements (minimum length and uppercase)
 * @param password - The password string to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validatePassword = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password);

/**
 * Sends sign-up data to the backend
 * @param email - User email
 * @param password - User password
 * @returns boolean - True if sign-up was successful
 */
export const signUpUser = async (email: string, password: string): Promise<boolean> => {
  try {
    await axios.post("http://localhost:8000/account/register/", { email: email, password:password, username: ""});
    alert("Registration successful!");
    return true;
  } catch (error) {
    console.error("Registration error:", error);
    alert(`Registration failed. Please try again.`);
    return false;
  }
};
