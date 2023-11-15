import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !password) {
      return alert("입력값을 확인해주세요");
    }

    const body = { id, password };

    axios
      .post("http://localhost:3001/login", body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("로그인 성공");
        localStorage.setItem("access_token", res.data.accessToken);
        window.location.replace("/");
      })
      .catch((e) => {
        alert("다시 시도해주세요");
        window.location.replace("");
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center fs-2 fw-bold ">로그인</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" />
          ID
          <input
            type="id"
            className="form-control"
            value={id}
            onChange={(e) => {
              const inputId = e.target.value;
              setId(inputId);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" />
          Password
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              const inputPassword = e.target.value;
              setPassword(inputPassword);
            }}
          />
        </div>

        <button type="submit" className="btn btn-success mb-3">
          Log In
        </button>
      </form>
      <Link className="link-opacity-25" style={{ color: "grey" }} to={"/join"}>
        아직 회원이 아니라면...
      </Link>
      <p></p>
      <Link
        className="link-opacity-25 me-2"
        style={{ color: "grey" }}
        to={"/findId"}
      >
        아이디 찾기
      </Link>

      <Link
        className="link-opacity-25"
        style={{ color: "grey" }}
        to={"/findPassword"}
      >
        비밀번호 찾기
      </Link>
    </div>
  );
};

export default LoginComponent;
