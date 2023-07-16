import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../features/User/UserApi";
import { useDispatch } from "react-redux";
import { authenticatedUser } from "../features/User/UserSlice";
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [Error, setError] = useState(null);
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const [register, { data, error, isLoading }] = useRegisterMutation();
  useEffect(() => {
    if (error?.data) {
      setError(error.data.message);
    } else {
      setError(null);
    }
    if (data?.token && data?.email && data?.name) {
      localStorage.setItem("user", JSON.stringify({ ...data }));

      dispatch(authenticatedUser({ ...data }));
    }
  }, [data, dispatch, error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ email, password, name });
  };
  return (
    <div className=" pt-5 mt-5 ">
      <div className="homebox  mx-auto my-auto row  align-items-center p-5 mt-5">
        <h3 className="text-center align-top fw-bolder">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="abc@gmail.com"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="floatingEmail" className="fw-bold">
              Email Address
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="name"
              onChange={(e) => setname(e.target.value)}
              value={name}
              required
            />
            <label htmlFor="floatingName" className="fw-bold">
              Name
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
              Register
            </button>
          </div>
          {Error && <div className="text-danger fw-bolder m-1">{Error}</div>}
        </form>
        <div className="text-center text-primary fw-bold mt-1">
          <p>Already have an account?</p>
          <Link to="/login" className="btn button fw-bold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
