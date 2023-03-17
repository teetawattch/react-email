import "./Sidebar.css";
import { useState, useEffect } from "react";

function Sidebar(props) {
  const [classHome, setClassHome] = useState("item");
  const [classOutbox, setClassOutbox] = useState("item");
  const [classDraft, setClassDraft] = useState("item");
  function checkActive() {
    if (props.status === "home") {
      setClassHome("item active");
    }
    if (props.status === "outbox") {
      setClassOutbox("item active");
    }
    if (props.status === "draft") {
      setClassDraft("item active");
    }
  }

  useEffect(() => {
    checkActive();
  });
  return (
    <ul className="side_bar">
      <div className="">
        <a href="/">
          <li className={classHome}>
            <i className="fas fa-envelope"></i> New Email
          </li>
        </a>
        <a href="/outbox">
          <li className={classOutbox}>
            <i className="fas fa-paper-plane"></i> Outbox
          </li>
        </a>
        <a href="/draft">
          <li className={classDraft}>
            <i className="fas fa-sticky-note"></i> Draft
          </li>
        </a>
      </div>
    </ul>
  );
}

export default Sidebar;
