import axios from "axios";
let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://127.0.0.1:8000/";
} else {
  url = "https://www.tee-dev.online/";
}

export default axios.create({
  baseURL: url,
});
