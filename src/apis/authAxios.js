import axios from "axios";
import { getRefreshToken } from "./refresh";

export const getAuthAxios = (token) => {
  const authAxios = axios.create({
    baseURL: "",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  authAxios.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response.status === 401) {
        const data = await getRefreshToken();

        error.config.headers.Authorization = "Bearer " + data.access_token;

        localStorage.setItem("user", JSON.stringify(data));

        return (await axios.get(error.config.url, error.config)).data;
      } else if (error.response.status == 500) {
        throw new Error(error);
      }
    }
  );
  return authAxios;
};
