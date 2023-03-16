import "./Outbox.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Outbox() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    if (token === "") {
      navigate("/login");
    }
    async function getOutbox() {
      try {
        const res = await API.get("api/email/gets", {
          headers: headers,
        });
        const json = await res.data.data;
        setData(json);
      } catch (error) {
        if (error.response.status === 401 || token === "") {
          navigate("/login");
        }
      }
    }
    getOutbox();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content">
        <div className="header">
          <h2>Outbox</h2>
        </div>
        {data.map((e) => {
          return (
            <div className="card" key={e.uid}>
              <div className="subjectEmail">
                <h4>{e.subject}</h4>
              </div>
              <div className="bodyEmail">
                <p>{e.body}</p>
              </div>
              <div className="sendTo">to : {e.email_send_to}</div>
              <div className="sendTo">by : {e.service}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Outbox;
