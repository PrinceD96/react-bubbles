import axios from "axios";

export const axiosWithAuth = () => {
  const token = sessionStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "http://localhost:5000/api"
  });
}