import axios from "axios";

export const signin = async (username, password) => {
  const result = await axios.post(
    "http://localhost:8080/api/v1/auth/authenticate",
    {
      username,
      password,
    }
  );
  return result.data;
};
