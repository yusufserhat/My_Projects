import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  //* ayrı stateler
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //* birleştirilmiş state
  // const [info, setInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();
  const { createUser, signUpProvider } = useContext(AuthContext);

  // const { email, password, firstName, lastName } = info;

  const handleSubmit = (e) => {
    const displayName = `${firstName} ${lastName}`;
    e.preventDefault();
    createUser(email, password, displayName, navigate);

    console.log(firstName, lastName);
  };

  // const hadleChange = (e) =>
  //   setInfo({ ...info, [e.target.id]: e.target.value });

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
        <div className={`form-container mt-[5vh] w-[380px] h-[580px] `}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Sign Up
            </h2>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="floating_text"
                className="peer"
                type="text"
                required
                placeholder=" "
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="floating_text">First Name</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="floating_text"
                className="peer"
                type="text"
                required
                placeholder=" "
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="floating_text">Last Name</label>
            </div>
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
            <button className="btn-danger" type="submit">
              Register
            </button>
            <button
              className="flex justify-between text-center items-center btn-danger"
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

export default Register;
