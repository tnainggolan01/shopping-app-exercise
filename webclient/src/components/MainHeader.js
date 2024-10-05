import React from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "../styles/MainHeader.module.css";

function MainHeader() {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    // Goto Login page and reset everything
    localStorage.removeItem("account");
    navigate("/login");
  };

  return (
    <header className={css.header}>
      <div className={css.header_content}>
        <div className={css.logo}>MyApp</div>
        <nav className={css.menu}>
          <Link to="/feed" className={css.menu_item}>
            News Feed
          </Link>
          <Link to="/product" className={css.menu_item}>
            Product List
          </Link>
          <Link to="/cart" className={css.menu_item}>
            Cart
          </Link>
        </nav>
        {localStorage.getItem("account") ? (
          <button className={css.login_logout_btn} onClick={handleLoginLogout}>
            Logout
          </button>
        ) : (
          <button className={css.login_logout_btn} onClick={handleLoginLogout}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
