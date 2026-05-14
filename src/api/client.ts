import axios from "axios";
import { getAPIBaseURL } from "@/api/config";

export const api = axios.create({
  baseURL: getAPIBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
