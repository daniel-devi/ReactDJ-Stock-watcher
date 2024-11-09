import API from "./API";

export const fetchUsername = async (userEmail: string): Promise<string> => {
  const response = await API.get(`/account/user?email=${userEmail}`);
  return response.data[0].username;
};

export const fetcherUserDetail = async (): Promise<[string]> => {
  const response = await API.get(`/account/detail`);
  return response.data;
};

export const postUserDetail = async (
  userPassword: string,
  userName: string
) => {
  const response = await API.post("/login", {
    username: userName,
    password: userPassword,
  });
  return response.data.token;
};

export const saveUserDetail = async () => {
  try {
    const response = await API.get("/account/detail");
    localStorage.setItem("UserName", response.data.username);
    localStorage.setItem("UserId", response.data.id);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Validates the email and password inputs
 * @returns {boolean} - Returns true if inputs are valid, false otherwise
 */
type validateInputsProps = {
  email: { value: string };
  password: { value: string };
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const validateInputs = ({
  email,
  password,
  setEmailError,
  setEmailErrorMessage,
  setPasswordError,
  setPasswordErrorMessage,
}: validateInputsProps): boolean => {
  let isValid = true;

  // Validate email
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    setEmailError(true);
    setEmailErrorMessage("Please enter a valid email address.");
    isValid = false;
  } else {
    setEmailError(false);
    setEmailErrorMessage("");
  }

  // Validate password
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
