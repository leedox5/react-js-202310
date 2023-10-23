import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { callLogout } from "../apis/callLogout";

const Navbar = ({ username }) => {
  const router = useNavigate();

  const logout = async () => {
    const result = await callLogout();

    console.log(result);

    localStorage.setItem("access", "");
    localStorage.setItem("refesh", "");
    router("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          단어장
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/book/intro">
                소개
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/book/stat/3000">
                통계
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="/book/view/10110">
                단어장 목록
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                로그아웃[{username}]
              </a>
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
