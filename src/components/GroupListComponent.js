import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import GroupCard from "./GroupCard";

const GroupListComponent = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { group_id } = useParams();
  const navigate = useNavigate();

  const clickCreateGroupButton = () => {
    navigate(`create`);
  };

  const getGroups = () => {
    axios
      .get(`http://localhost:3001/group`)
      .then((res) => {
        setGroups(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boards:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (groups.length === 0) {
    return (
      <div className="container">
        <div>
          <div className="display-3 fw-bold mt-5 text-center">
            <div>Groups</div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary cursor-pointer"
            onClick={clickCreateGroupButton}
          >
            그룹 생성
          </button>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          그룹이 없습니다.
        </div>
      </div>
    );
  }

  const renderGroupList = () => {
    return groups.map((group) => {
      return (
        <GroupCard
          key={group.group_id}
          group_id={group.group_id}
          name={group.group_name}
          onClick={() => {
            navigate(`/group/${group.group_id}`);
          }}
        />
      );
    });
  };

  return (
    <div className="container">
      <div>
        <div className="display-3 fw-bold mt-5 text-center">
          <div>Groups</div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary cursor-pointer"
          onClick={clickCreateGroupButton}
        >
          그룹 생성
        </button>
      </div>
      {renderGroupList()}
    </div>
  );
};

export default GroupListComponent;
