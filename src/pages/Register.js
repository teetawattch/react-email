import "./Register.css";
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function getRegister() {
    const data = {
      email: email,
      name: name,
      password: password,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await API.post("api/auth/register", data, {
        headers: headers,
      });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="container">
      <div className="formRegister">
        <h3>Register</h3>
        <div className="input">
          <input
            type="email"
            placeholder="email"
            id="email_register"
            className="formInput"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="name"
            id="name_register"
            className="formInput"
            onInput={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            id="password_register"
            className="formInput"
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnFormRegister">
          <a href="/login">Login?</a>
          <button className="btnRegister" onClick={getRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
