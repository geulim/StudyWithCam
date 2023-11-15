import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo03.png";
const Navbar = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          SetIsLoggedIn(true);
          setName(res.data.name);
        })
        .catch((error) => {
          console.error("API 요청 중 에러 발생:", error);
        });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ objectFit: "cover" }} />
        </Link>
        <div>
          <div>{name} 님 안녕하세요</div>
          <hr />
          <Link className="navbar-brand" to="http://localhost:3001/study">
            Study
          </Link>
          <Link className="navbar-brand" to="/group">
            Group
          </Link>
          <button
            className="btn btn-danger fw-bold"
            onClick={() => {
              axios
                .post(
                  "http://localhost:3001/logout",
                  {},
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res);
                  localStorage.clear();
                  window.location.replace("http://localhost:3000");
                });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img  src={logo} alt="Logo" style={{ objectFit: "cover" }} />
        </Link>
        <div >
          <Link className="navbar-brand" to="/login">
            Login
          </Link>

          <Link className="navbar-brand" to="/join">
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
