import { getAuthAxios } from "./authAxios";

export const getHome = async () => {
  const user = localStorage.getItem("user");

  try {
    const authAxios = getAuthAxios(JSON.parse(user).access_token);
    const result = await authAxios.get("api/v1/auth/intro");
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }

  /* ---
  try {
    const result = await axios.get(
      "/api/v1/demo",
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      },
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    if (error.response.status === 401) {
      console.log(error.response.data);
      const { access_token, refresh_token } = await getRefreshToken();
      error.config.headers.Authorization = "Bearer " + access_token;
      localStorage.setItem("access", access_token);
      localStorage.setItem("refresh", refresh_token);
      return axios.get(error.config.url, error.config).data;
    }
  }
  --- */
};
