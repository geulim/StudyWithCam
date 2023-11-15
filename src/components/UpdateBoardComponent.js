import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBoardComponent = () => {
  const { board_id, group_id } = useParams();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // 기존 게시글의 제목과 내용을 가져옵니다.
    axios
      .get(`http://localhost:3001/group/${group_id}/board/${board_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setTitle(res.data.title);
        setContents(res.data.contents);
      })
      .catch((e) => console.log(e));
  }, [board_id, group_id, token]);

  const goBack = () => {
    navigate(`/group/${group_id}/board/${board_id}`);
  };

  const onSubmit = () => {
    axios
      .patch(
        `http://localhost:3001/group/${group_id}/board/${board_id}/update`,
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
      .then(() => {
        navigate(`/group/${group_id}/board/${board_id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>게시글 수정</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={contents}
          rows="10"
          onChange={(e) => setContents(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={onSubmit}>
        수정
      </button>

      <button className="btn btn-danger ms-2" onClick={goBack}>
        취소
      </button>
    </div>
  );
};

export default UpdateBoardComponent;
