import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const GroupCard = ({ name, onClick, children }) => {
  const { group_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const ClickToJoinGroup = (e) => {
    e.stopPropagation();
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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card mt-3 cursor-pointer"
      style={{ height: "5rem" }}
      onClick={onClick}
    >
      {/* d-flex align-items-center  */}
      <div className="card-body py-1 d-flex align-items-center justify-content-center">
        <div className="fs-3 fw-bold">{name}</div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default GroupCard;
