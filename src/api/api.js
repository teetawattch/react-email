import axios from "axios";
let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://127.0.0.1:8000/";
} else {
  url = "http://0.0.0.0/";
}

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
