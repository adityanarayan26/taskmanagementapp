import axios from "axios";
import { backendURI } from "./Backend_uri";

export const axiosInstance = axios.create({
    baseURL: `${backendURI}/api`,
    withCredentials: true,
})