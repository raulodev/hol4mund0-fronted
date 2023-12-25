import axios from "axios";

// host del api
export const baseURL = "https://raulcobiellas.pythonanywhere.com"


export const serverApi = axios.create({
  baseURL: baseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});




export const clientApi = axios.create({
  baseURL: baseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


