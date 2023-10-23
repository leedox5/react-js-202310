import axios from "axios";

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

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
