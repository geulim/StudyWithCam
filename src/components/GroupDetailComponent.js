import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Card from "./Card";
import NameCard from "./NameCard";

const GroupDetailComponent = () => {
  const [groupName, setGroupName] = useState("");

  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [groupOwner, setGroupOwner] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const { group_id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const clickJoinGroupButton = () => {
    axios
      .post(
        `http://localhost:3001/group/${group_id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ClickDeleteGroupButton = () => {
    axios
      .delete(`http://localhost:3001/group/${group_id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        alert(`그룹 "${groupName}" 이 삭제되었습니다.`);
        navigate("/group");
      })
      .catch((e) => {
        console.error(e);
        alert("잘못된 접근입니다.");
      });
  };

  // 그룹 이름
  const getGroupName = (group_id) => {
    axios
      .get(`http://localhost:3001/group/${group_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (!res) {
          alert("존재하지 않는 그룹입니다.");
          navigate("/group");
        }
        setGroupName(res.data.group_name);
        setIsMember(res.data.isMember);
      })
      .catch((error) => {
        console.error("Error fetching board details:", error);
        setLoading(false);
      });
  };

  //게시판 목록 가져오기
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boards:", err);
      });
  };

  const getGroupOwner = (group_id) => {
    axios
      .get(`http://localhost:3001/group/${group_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setGroupOwner(res.data.Users[0].name);
      }); // 그룹 멤버 조회에서 가져오면 될듯
  };

  const getGroupDescription = (group_id) => {
    axios
      .get(`http://localhost:3001/group/${group_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setGroupDescription(res.data.group_description);
      });
  };

  //멤버 조회
  const getMember = (group_id) => {
    axios
      .get(`http://localhost:3001/group/${group_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.Users);
        setMembers(res.data.Users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boards:", err);
      });
  };

  const clickCreateBoardButton = () => {
    navigate(`/group/${group_id}/board/create`);
  };

  const leaveGroupButton = () => {
    axios
      .post(
        `http://localhost:3001/group/${group_id}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/group`);
        alert("그룹에서 탈퇴 하셨습니다.");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMember(group_id);
    getGroupOwner(group_id);
    getBoards(group_id);
    getGroupName(group_id);
    getGroupDescription(group_id);
  }, [group_id]);

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

  const renderMemberList = () => {
    return members.map((member) => {
      return <NameCard key={member.user_id} name={member.name}></NameCard>;
    });
  };

  const ifEmptyBoard = () => {
    if (boards.length === 0) {
      return (
        <div
          style={{ color: "grey" }}
          className="mt-5 d-flex justify-content-center link-opacity-25 me-2"
        >
          게시글이 없습니다.
        </div>
      );
    }
  };

  const ifEmptyGroup = () => {
    if (members.length === 0) {
      return (
        <div
          style={{ color: "grey" }}
          className="mt-5 d-flex justify-content-center link-opacity-25 me-2"
        >
          그룹 멤버가 없습니다.
        </div>
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="mt-3 fs-1 fw-bold d-flex justify-content-center">
            <div>{groupName}</div>
          </div>
          <div className="d-flex justify-content-start mb-3 fw-bold fs-5">
            그룹 설명: {groupDescription}
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3 fw-bold fs-5">
            <div>그룹 장: {groupOwner}</div>
            <div>
              {isMember ? (
                <>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={leaveGroupButton}
                  >
                    그룹 탈퇴
                  </button>
                  <button
                    onClick={ClickDeleteGroupButton}
                    className="btn btn-danger"
                  >
                    그룹 삭제
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary me-2"
                  onClick={clickJoinGroupButton}
                >
                  그룹 가입
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <div>
                <div className="mb-3 fs-1 fw-bold d-flex align-items-center justify-content-center">
                  그룹 게시판
                </div>
                {boards.length === 0 ? ifEmptyBoard() : renderBoardList()}
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={clickCreateBoardButton}
                  >
                    작성
                  </button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <div className="mb-3 fs-1 fw-bold d-flex align-items-center justify-content-center">
                  멤버
                </div>
                {members.length === 0 ? ifEmptyGroup() : renderMemberList()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailComponent;
