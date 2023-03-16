import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function getLogin() {
    const navigate = useNavigate();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await API.post("api/auth/login", data);
      const json = await res.data;

      localStorage.setItem("token", json.access_token);
      if (json.access_token) {
        navigate("/");
      }
    } catch (error) {
      alert("something went wrong.");
    }
  }

  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);
  return (
    <div className="container">
      <div className="formLogin">
        <h3>Login</h3>
        <div className="input">
          <input
            type="text"
            placeholder="email"
            id="email_login"
            data-testid="email-input"
            className="formInput"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            id="password_login"
            data-testid="password-input"
            className="formInput"
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnFormLogin">
          <a href="/register">Register?</a>
          <button className="btnLogin" data-testid="login-btn" onClick={getLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
