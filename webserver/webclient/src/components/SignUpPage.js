import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../api";
import {
  validateInput,
  validateEmail,
  validatePassword,
} from "../util/validation";
import { logout, resetPosts } from "../store/actions";
import css from "../styles/SignUpPage.module.css";

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

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpw, setCheckpw] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCheckpw, setErrCheckpw] = useState("");

  useEffect(() => {
    // console.log("SignUpPage useEffect");
    // Delete account and posts info when coming to Sign Up page
    localStorage.removeItem("account");
    dispatch(logout());
    dispatch(resetPosts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValidationPassed = true;
    setErrMessage("");

    // Validate inputs
    if (!validateInput(firstname)) {
      setErrFirstName("Enter a valid first name.");
      isValidationPassed = false;
    } else {
      setErrFirstName("");
    }
    if (!validateInput(lastname)) {
      setErrLastName("Enter a valid last name.");
      isValidationPassed = false;
    } else {
      setErrLastName("");
    }
    if (!validateEmail(email)) {
      setErrEmail("Enter a valid email address.");
      isValidationPassed = false;
    } else {
      setErrEmail("");
    }
    if (!validatePassword(password)) {
      setErrPassword(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValidationPassed = false;
    } else {
      setErrPassword("");
    }
    if (password !== checkpw) {
      setErrCheckpw("Passwords do not match.");
      isValidationPassed = false;
    } else {
      setErrCheckpw("");
    }

    if (isValidationPassed) {
      let account = {
        firstname,
        lastname,
        email,
        password,
      };

      try {
        await createAccount(account);
        // console.log(response.data);
        navigate("/");
      } catch (error) {
        // console.log(error.response.status);
        // console.log(error.message);
        // console.log(error.response.data.error);
        if (error.response.status === 499) {
          setErrMessage("Account already exists.");
        } else {
          setErrMessage("An error occurred while signing up.");
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className={css.wrapper}>
        <div className={css.signup_container}>
          <h1>Sign Up</h1>
          <form
            className={css.form}
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <p className={css.err_text}>{errMessage}</p>
            </div>
            <div>
              <p className={css.err_text}>{errFirstName}</p>
            </div>
            <div>
              <p className={css.err_text}>{errLastName}</p>
            </div>
            <div>
              <p className={css.err_text}>{errEmail}</p>
            </div>
            <div>
              <p className={css.err_text}>{errPassword}</p>
            </div>
            <div>
              <p className={css.err_text}>{errCheckpw}</p>
            </div>
            <input
              className={css.form_input}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={30}
              required
            />
            <input
              className={css.form_input}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={30}
              required
            />
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
              maxLength={30}
              required
            />
            <input
              className={css.form_input}
              type="password"
              name="checkpw"
              placeholder="Confirm password"
              value={checkpw}
              onChange={(e) => setCheckpw(e.target.value)}
              maxLength={30}
              required
            />
            <button id={css.signup} type="submit">
              Sign Up
            </button>
          </form>
          <div id={css.separator}></div>
          <div id={css.login_cta}>
            Already have an account?&nbsp;
            <Link to="/login" id={css.login_link}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
