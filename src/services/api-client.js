import axios from "axios";

// Lado del servidor
const serverBaseURL = process.env.DJANGO_SERVICE_URL;


export const serverApi = axios.create({
  baseURL: serverBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lado del cliente 
const clientBaseURL = "https://raulcobiellas.pythonanywhere.com/api";


export const clientApi = axios.create({
  baseURL: clientBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const baseURL = process.env.DJANGO_SERVICE_URL
