import axios from "axios";

export const callLogout = async () => {
  const token = localStorage.getItem("access");
  const result = await axios.post(
    "/api/v1/auth/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return result.data;
};
