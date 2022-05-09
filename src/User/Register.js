import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { originalData, register } from "../Lib/helper";
import { login } from "./UserReducer";

const Register = () => {
  const handleRegister = register;
  const { userData, userDispatch } = useContext(UserContext);
  const [data, setData] = useState(originalData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegister(data);
    if (res) {
      userDispatch(login(res));
      return <Navigate to="/" />;
    }
  };

  if (userData.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form
      className="flex content-center items-center flex-col h-full gap-2 p-5 text-base-content"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl mb-10 p-2 font-extrabold text-current-focus">
        Form Register
      </h1>
      <div className="form-control">
        <label className="input-group">
          <span style={{ width: 100 }}>Username</span>
          <input
            name="name"
            type="text"
            placeholder="your name"
            className="input input-bordered"
            value={data.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span style={{ width: 100 }}>Email</span>
          <input
            name="email"
            type="email"
            placeholder="info@site.com"
            className="input input-bordered"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span style={{ width: 100 }}>Password</span>
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            className="input input-bordered"
            value={data.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span style={{ width: 100 }}>Verify</span>
          <input
            name="verifyPassword"
            type="password"
            placeholder="Verify Password"
            className="input input-bordered"
            value={data.verifyPassword}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-control mt-10">
        <button type="submit" className="btn btn-primary bg-base-200">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
