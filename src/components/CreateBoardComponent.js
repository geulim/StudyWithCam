import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateBoardComponent = () => {
  const { board_id, group_id } = useParams();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const goBack = () => {
    navigate(`/group/${group_id}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/group/${group_id}/board/create`,
        {
          title,
          contents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate(`/group/${group_id}`);
      })
      .catch((e) => {
        alert("게시글 생성 중 문제가 발생했습니다.");
        console.log(e);
      });
  };

  return (
    <div className="container">
      <h1>게시글 생성</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log("title:" + e.target.value);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contents</label>
        <textarea
          className="form-control"
          value={contents}
          rows="10"
          onChange={(e) => {
            setContents(e.target.value);
            console.log("contents:" + e.target.value);
          }}
        />
      </div>

      <button className="btn btn-primary" onClick={onSubmit}>
        저장
      </button>

      <button className="btn btn-danger ms-2" onClick={goBack}>
        취소
      </button>
    </div>
  );
};

export default CreateBoardComponent;
