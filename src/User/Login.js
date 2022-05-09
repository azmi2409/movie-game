import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate,useNavigate } from "react-router-dom";
import { handleLogin } from "../Lib/helper";
import { login } from "./UserReducer";

const Login = () => {
  const navigate = useNavigate();
  const { userData, userDispatch } = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin(data);
    if (res) {
      userDispatch(login(res));
      return navigate("/");
    }
  };

  const {isLoggedIn} = userData;

  if(isLoggedIn){
    return <Navigate to="/" />;
  }

  return (
    <>
    <form
      className="flex align-middle content-center items-center flex-col flex-wrap min-w-full gap-2 p-5 text-base-content"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl mb-10 p-2 font-extrabold text-current-focus">
        Login Form
      </h1>
      <div className="form-control">
        <label className="input-group">
          <span style={{ width: 100 }}>Email</span>
          <input
            name="email"
            type="email"
            placeholder="your email"
            className="input input-bordered"
            value={data.name}
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
            required
          />
        </label>
      </div>
      <div className="form-control mt-10">
        <button type="submit" className="btn btn-primary bg-base-200">
          Login
        </button>
      </div>
    </form>
  </>
  );
};

export default Login;
