import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

function EditDraft() {
  const navigate = useNavigate();
  const [sendto, setSendto] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [uid, setUid] = useState("");

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }, [token]);
  const data = {
    send_to: sendto,
    subject: subject,
    body: body,
    uid: uid,
  };
  async function sendEmail() {
    try {
      const res = await API.post("api/email/send", data, {
        headers: headers,
      });
      if (res.status === 202 || res.status === 200) {
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

  async function saveDraft() {
    try {
      const res = await API.post("api/email/draft/save", data, {
        headers: headers,
      });
      if (res.status === 202 || res.status === 200) {
        navigate("/draft");
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
    async function showUser() {
      try {
        const res = await API.post("api/auth/me", "", { headers });
        if (res.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        return navigate("/login");
      }
    }
    if (token === "" || localStorage.length === 0) {
      navigate("/login");
    }
    showUser();
    async function getDraftEmail() {
      const uid = window.location.href.split("/")[5];
      setUid(uid);
      const res = await API.get("api/email/draft/get/" + uid, { headers });

      if (res.status === 200) {
        setSendto(res.data.data.email_send_to);
        setSubject(res.data.data.subject);
        setBody(res.data.data.body);
      } else {
        navigate("/draft");
      }
    }
    getDraftEmail();
  }, [headers, navigate, token]);
  return (
    <div>
      <Navbar />
      <Sidebar status="draft" />
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
            value={sendto}
          />
          <input
            type="text"
            placeholder="subject"
            id="subject"
            className="formInput"
            onInput={(e) => setSubject(e.target.value)}
            value={subject}
          />
          <textarea
            placeholder="body"
            id="body"
            className="formInput"
            rows={10}
            onInput={(e) => setBody(e.target.value)}
            value={body}
          />
          <div className="btnForm">
            <button className="btnSendEmail" onClick={sendEmail}>
              Send email
            </button>
            <button className="btnSaveDraft" onClick={saveDraft}>
              Save draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDraft;
