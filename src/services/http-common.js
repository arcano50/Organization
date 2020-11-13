import axios from "axios";

let data;

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  }
});