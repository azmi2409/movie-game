import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { changePassword } from "../Lib/helper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [password, setPassword] = useState({});
  const { user } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(password);
    navigate("/");
  };

  return (
    <div className="flex align-middle content-center items-center text-base-content flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
      <figure className="avatar">
        <div className="w-24 rounded">
          <img src="https://i.pravatar.cc/300" alt="avatar" />
        </div>
      </figure>
      <h2 className="text-xl">Your Email : {user.email}</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h2 className="text-xl">Change Password</h2>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Current Password
            </span>
            <input
              name="current_password"
              type="password"
              placeholder="Current Password"
              className="input input-bordered"
              value={password.current_password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              New Password
            </span>
            <input
              name="new_password"
              type="password"
              placeholder="New Password"
              className="input input-bordered"
              value={password.new_password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Confirm Password
            </span>
            <input
              name="new_confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
              value={password.new_confirm_password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control mt-3 col-span-2 items-center">
        <button
          type="submit"
          className="btn btn-primary rounded-lg bg-base-200 w-52 text-base-content normal-case"
        >
          Post
        </button>
      </div>
      </form>
    </div>
  );
};

export default Dashboard;
