import "./Navbar.css";
function Navbar() {
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
            <li className="">Username</li>
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
