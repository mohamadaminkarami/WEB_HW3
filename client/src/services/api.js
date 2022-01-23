import axios from "axios";
import config from "../config";
const { REACT_APP_BACKEND_URL } = config;
export const BACKEND_URL = REACT_APP_BACKEND_URL;

const API = axios.create({
  baseURL: BACKEND_URL,
});

export default API;
