import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/User/UserApi";
import { useDispatch } from "react-redux";
import { authenticatedUser } from "../features/User/UserSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data) {
      setError(error.data.message);
    } else {
      setError(null);
    }
    if (data?.token && data?.email) {
      localStorage.setItem("user", JSON.stringify({ ...data }));

      dispatch(authenticatedUser({ ...data }));
      navigate("/");
    }
  }, [data, dispatch, error, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };
  return (
    <div className=" pt-5 mt-5 ">
      <div className="homebox  mx-auto my-auto row  align-items-center p-5 mt-5 d-flex ">
        <h3 className="text-center align-top fw-bolder">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="floatingInput" className="fw-bold">
              Email Address
            </label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              required
            />
            <label htmlFor="floatingPassword" className="fw-bold">
              Password
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn button-submit fw-bold"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          {Error && <div className="text-danger fw-bolder m-1">{Error}</div>}
        </form>
        <div className="text-center text-primary fw-bold ">
          <p>Haven't registered yet?</p>
          <Link to="/register" className="btn button fw-bold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
