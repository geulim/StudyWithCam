import axios from "axios";
import { useState } from "react";

const FindIdComponent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/findId", { email, name })
      .then((res) => {
        console.log("Email:", email);
        console.log("Name:", name);
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.error(err);
        alert("해당 정보와 일치하는 ID를 찾을 수 없습니다.");
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center fs-2 fw-bold mb-3">
        아이디 찾기
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const inputEmail = e.target.value;
              setEmail(inputEmail);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              const inputName = e.target.value;
              setName(inputName);
            }}
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            아이디 찾기
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindIdComponent;
