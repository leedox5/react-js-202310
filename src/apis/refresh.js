import axios from "axios";

export const getRefreshToken = async () => {
  const user = localStorage.getItem("user");
  const refreshToken = JSON.parse(user).refresh_token;

  const result = await axios.post(
    "/api/v1/auth/refresh-token",
    {},
    {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    }
  );
  return result.data;
};
