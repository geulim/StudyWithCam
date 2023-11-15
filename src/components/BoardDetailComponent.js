import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const BoardDetailComponent = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { group_id, board_id } = useParams();
  const token = localStorage.getItem("access_token");

  const visitUpdatePage = () => {
    navigate(`/group/${group_id}/board/${board_id}/update`);
  };

  const goBack = () => {
    navigate(`/group/${group_id}`);
  };

  const deleteBoard = () => {
    axios
      .delete(
        `http://localhost:3001/group/${group_id}/board/${board_id}/delete`,
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
        console.log(e);
        alert("잘못된 접근입니다.");
      });
  };

  const getBoardDetail = ({ group_id, board_id }) => {
    axios
      .get(`http://localhost:3001/group/${group_id}/board/${board_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setBoard(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching board details:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBoardDetail({ group_id, board_id });
  }, [group_id, board_id]);

  const printDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!board) return <div>게시글이 없습니다.</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1 className="flex-grow-1">{board.title}</h1>
      </div>
      <small className="text-muted">
        작성 시간: {printDate(board.createdAt)}
      </small>
      <hr />
      <div className="mb-5">{board.contents}</div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-1 mt-5" onClick={goBack}>
          목록
        </button>
        <button
          className="btn btn-success me-1 mt-5 "
          onClick={visitUpdatePage}
        >
          수정
        </button>

        <button className="btn btn-danger mt-5 " onClick={deleteBoard}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default BoardDetailComponent;
