import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../api";
import { login, logout, resetPosts } from "../store/actions";
import { validateEmail } from "../util/validation";
import css from "../styles/LoginPage.module.css";

/*
state/auth = {
  isLogin: Boolean,
  account_id: String,
  account_detail: {
   firstname: String,
   lastname: String,
   email: String,
  }
}
*/

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    // console.log("LoginPage useEffect");
    // Delete account and posts info when coming to Login page
    localStorage.removeItem("account");
    dispatch(logout());
    dispatch(resetPosts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValidationPassed = true;
    setErrMessage("");

    if (!validateEmail(email)) {
      setErrMessage("Enter a valid email address.");
      isValidationPassed = false;
    }

    if (isValidationPassed) {
      let account = {
        email,
        password,
      };
      try {
        const response = await loginAccount(account);
        // console.log(response.data);
        localStorage.setItem("account", response.data._id);
        dispatch(login(response.data));
        navigate("/feed");
      } catch (error) {
        // console.log(error.response.status);
        // console.log(error.message);
        // console.log(error.response.data.error);
        if (error.response.status === 401) {
          setErrMessage("Invalid email or password.");
        } else {
          setErrMessage("An error occurred while logging in.");
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={css.wrapper}>
        <div className={css.login_container}>
          <h1>Login</h1>
          <form
            className={css.form}
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <p className={css.err_text}>{errMessage}</p>
            </div>
            <input
              className={css.form_input}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={css.form_input}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button id={css.login} type="submit">
              Login
            </button>
          </form>
          <div id={css.separator}></div>
          <button id={css.signup} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
