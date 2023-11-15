import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroupComponent = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/group/create",
        { group_name: groupName, group_description: groupDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/group");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="row mt-5">
        <label className="mb-4 fw-bold fs-2 d-flex justify-content-center">
          그룹 생성하기
        </label>
        <div className="input-group">
          <span class="input-group-text">Group Name</span>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => {
              const inputName = e.target.value;
              setGroupName(inputName);
            }}
          />
        </div>
        <div className="input-group mt-4">
          <span className="input-group-text">Group Description</span>
          <textarea
            type="text"
            className="form-control"
            rows="5"
            placeholder="Description"
            onChange={(e) => {
              const inputDescription = e.target.value;
              setGroupDescription(inputDescription);
            }}
          />
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button type="submit" className="btn btn-primary">
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateGroupComponent;
