import "./Home.css";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [sendto, setSendto] = useState();
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const data = {
    send_to: sendto,
    subject: subject,
    body: body,
  };
  async function sendEmail() {
    try {
      const res = await API.post("api/email/send", data, {
        headers: headers,
      });
      if (res.status === 202) {
        navigate("/outbox");
      } else {
        alert("something went wrong.");
      }
    } catch (error) {
      if (error.response.status === 401 || token === "") {
        return navigate("/login");
      } else {
        alert("something went wrong.");
      }
    }
  }

  useEffect(() => {
    if (token === "" || localStorage.length === 0) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content">
        <div className="header">
          <h2>New Email</h2>
        </div>
        <div className="form">
          <input
            type="text"
            placeholder="send to"
            id="send_to"
            className="formInput"
            onInput={(e) => setSendto(e.target.value)}
          />
          <input
            type="text"
            placeholder="subject"
            id="subject"
            className="formInput"
            onInput={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="body"
            id="body"
            className="formInput"
            rows={10}
            onInput={(e) => setBody(e.target.value)}
          />
          <div className="btnForm">
            <button className="btnSendEmail" onClick={sendEmail}>
              Send email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
