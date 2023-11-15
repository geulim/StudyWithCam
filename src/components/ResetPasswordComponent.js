import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordComponent = () => {
  const [id, setId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post(`http://localhost:3001/resetPassword`, { id, newPassword })
      .then((res) => {
        if (res.status === 200) {
          alert("비밀번호가 성공적으로 재설정되었습니다.");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("비밀번호 재설정 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center fs-2 fw-bold mb-3">
        비밀번호 재설정
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">새 비밀번호</label>
          <input
            type="password"
            className="form-control"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">비밀번호 확인</label>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordComponent;
