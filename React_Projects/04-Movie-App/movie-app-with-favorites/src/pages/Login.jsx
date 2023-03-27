import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { signIn, signUpProvider, forgotPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password, navigate);
    // console.log(email, password);
  };

  const handleProviderLogin = () => {
    signUpProvider();
  };
  return (
    <div className="flex justify-center">
      <div className="form-image hidden md:block">
        <img
          src={"https://picsum.photos/800/800"}
          className="object-cover h-screen w-full"
          alt="sample-movie"
        />
      </div>
      <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
        <div className={`form-container mt-[10vh] w-[380px] h-[500px]`}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Sign in
            </h2>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="floating_email"
                className="peer"
                type="email"
                placeholder=" "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floating_email">Email</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="floating_password"
                className="peer"
                type="password"
                placeholder=" "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floating_password">Password</label>
            </div>
            <div className="flex justify-between">
              <span
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
                onClick={() => forgotPassword(email)}
              >
                Forgot Password
              </span>
              <Link
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
            <button className="btn-danger" type="submit">
              Login
            </button>
            <button
              className="flex items-center justify-between btn-danger"
              type="button"
              onClick={handleProviderLogin}
            >
              Continue with Google
              <GoogleIcon color="currentColor" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
