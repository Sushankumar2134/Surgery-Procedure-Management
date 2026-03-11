// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://tamala-unsighing-quadrennially.ngrok-free.dev/api/",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.188:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default api;