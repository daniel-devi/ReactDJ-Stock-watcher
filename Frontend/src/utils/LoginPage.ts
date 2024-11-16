import API from "./API";

/**
 * Fetches a username from the server based on the provided email address
 * @param {string} userEmail - The email address of the user to look up
 * @returns {Promise<string>} The username associated with the email address
 * @throws {Error} If the API request fails or no user is found
 */
export const fetchUsername = async (userEmail: string): Promise<string> => {
  const response = await API.get(`/account/user?email=${userEmail}`);
  return response.data[0].username;
};

/**
 * Retrieves user details from the server
 * @returns {Promise<[string]>} Array containing user details
 * @throws {Error} If the API request fails
 */
export const fetcherUserDetail = async (): Promise<[string]> => {
  const response = await API.get(`/account/detail`);
  return response.data;
};

/**
 * Authenticates user by posting login credentials to the server
 * @param {string} userPassword - The user's password
 * @param {string} userName - The user's username
 * @returns {Promise<string>} Authentication token from the server
 * @throws {Error} If authentication fails
 */
export const postUserDetail = async (
  userPassword: string,
  userName: string
) => {
  // Send login request to server with username and password
  const response = await API.post("/login/", {
    username: userName,
    password: userPassword,
  });
  // Return authentication token from server response
  localStorage.setItem("refreshToken", response.data.refresh);
  return response.data.access;

};

/**
 * Fetches and saves user details to local storage
 * @returns {Promise<void>}
 * @throws {Error} If fetching user details fails
 */
export const saveUserDetail =  async (): Promise<void> => {
  try {
    // Get user details from server
    const response =  await API.get("/account/detail");
    console.log("Saved user details.......");
    // Store username and user ID in local storage for persistence
    localStorage.setItem("UserName", response.data.username);
    localStorage.setItem("UserId", response.data.id);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Type definition for validateInputs function parameters
 */
type validateInputsProps = {
  email: { value: string };
  password: { value: string };
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * Validates the email and password inputs
 * @param {validateInputsProps} props - Object containing email, password and error state setters
 * @returns {boolean} - Returns true if inputs are valid, false otherwise
 */
export const validateInputs = ({
  email,
  password,
  setEmailError,
  setEmailErrorMessage,
  setPasswordError,
  setPasswordErrorMessage,
}: validateInputsProps): boolean => {
  let isValid = true;

  // Validate email using regex pattern for basic email format
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    setEmailError(true);
    setEmailErrorMessage("Please enter a valid email address.");
    isValid = false;
  } else {
    setEmailError(false);
    setEmailErrorMessage("");
  }

  // Validate password length (minimum 6 characters)
  if (!password.value || password.value.length < 6) {
    setPasswordError(true);
    setPasswordErrorMessage("Password must be at least 6 characters long.");
    isValid = false;
  } else {
    setPasswordError(false);
    setPasswordErrorMessage("");
  }

  return isValid;
};
