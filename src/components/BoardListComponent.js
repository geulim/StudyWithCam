import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Card from "./Card";

const BoardListComponent = () => {
  const navigate = useNavigate();
  const { group_id } = useParams();
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 초기 값을 true로 설정

  const token = localStorage.getItem("access_token");
  const getBoards = (group_id) => {
    axios
      .get(`http://localhost:3001/group/${group_id}/board`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setBoards(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boards:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBoards(parseInt(group_id));
  }, [group_id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (boards.length === 0) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        게시글이 없습니다.
      </div>
    );
  }

  const renderBoardList = () => {
    return boards.map((board) => {
      return (
        <Card
          key={board.board_id}
          title={board.title}
          onClick={() => {
            navigate(`/group/${group_id}/board/${board.board_id}`);
          }}
        ></Card>
      );
    });
  };

  return <div>{renderBoardList()}</div>;
};

export default BoardListComponent;
