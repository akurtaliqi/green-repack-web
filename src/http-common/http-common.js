import axios from "axios";

export default axios.create({
  baseURL: "https://test-green-repack-back.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});