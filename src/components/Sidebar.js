import "./Sidebar.css";
function Sidebar() {
  return (
    <ul className="side_bar">
      <div className="">
        <a href="/">
          <li className="item">
            <i className="fas fa-envelope"></i> New Email
          </li>
        </a>
        <a href="/outbox">
          <li className="item">
            <i className="fas fa-paper-plane"></i> Outbox
          </li>
        </a>
      </div>
    </ul>
  );
}

export default Sidebar;
