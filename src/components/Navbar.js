import "./Navbar.css";
import { useState, useEffect } from "react";
import API from "../api/api";

const Navbar = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    async function showUser() {
      try {
        const res = await API.post("api/auth/me", "", { headers });
        const data = await res.data;
        setUsername(data.name);
      } catch (error) {
        console.log(error.response);
      }
    }
    showUser();
  }, []);
  return (
    <ul className="navbar row">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="dropdown">
        <li>
          <i className="fas fa-user"></i>
        </li>
        <div className="dropdown-content">
          <a href="/">
            <li className="">{username}</li>
          </a>
          <a href="/login">
            <li className="">Logout</li>
          </a>
        </div>
      </div>
    </ul>
  );
}

export default Navbar;
