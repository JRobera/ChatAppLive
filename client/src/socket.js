import api from "./axios.js";
import { io } from "socket.io-client";

export const socket = io(api.defaults.baseURL, { autoConnect: true });
