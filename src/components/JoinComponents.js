import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinComponents = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password || !name || !email) {
      return alert("입력값을 확인해주세요");
    }

    const body = { id, password, name, email };

    await axios
      .post("http://localhost:3001/join", body)
      .then((res) => {
        console.log("회원가입 성공");
        navigate("/");
      })
      .catch((error) => {
        console.error("회원가입 중 오류 발생:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center fs-2 fw-bold ">
        회원가입
      </div>
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

        <div className="mb-3">
          <label className="form-label" />
          Name
          <input
            type="name"
            className="form-control"
            value={name}
            onChange={(e) => {
              const inputName = e.target.value;
              setName(inputName);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" />
          Email
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              const inputEmail = e.target.value;
              setEmail(inputEmail);
            }}
          />
        </div>

        <button type="submit" className="btn btn-success mb-3">
          Join
        </button>
      </form>
      <Link className="link-opacity-25" style={{ color: "grey" }} to={"/login"}>
        문득 가입한게 생각났다면...
      </Link>
    </div>
  );
};

export default JoinComponents;
