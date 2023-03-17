import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Draft.css";

function Draft() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  function editDraft(uid) {
    navigate("/draft/edit/" + uid);
    // console.log(uid);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    if (token === "") {
      navigate("/login");
    }
    async function getDraf() {
      try {
        const res = await API.get("api/email/draft/gets", {
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
    getDraf();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar status="draft" />
      <div className="content">
        <div className="header">
          <h2>Draft</h2>
        </div>
        {data.map((e) => {
          return (
            <div className="card" key={e.uid} onClick={() => editDraft(e.uid)}>
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

export default Draft;
