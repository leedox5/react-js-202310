import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getHome } from "./apis/getHome";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HomeLayout from "./HomeLayout";
import Title from "./components/Title";
import Page20231001 from "./pages/Page20231001";
import Page20231002 from "./pages/Page20231002";

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/v1/hello", {
      method: "GET",
      redirect: "follow",
    }).then((response) => response);

    console.log(response);

    if (response.redirected) {
      document.location = response.url;
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");
    console.log(refreshToken);
    if (refreshToken) {
      getHome().then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      document.location = "http://localhost:8080";
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Title username={data} />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home username={data} />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/intro" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Page20231001 />} />
        <Route path="/detail" element={<Page20231002 />}></Route>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
    /* ---
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    --- */
  );
}

export default App;
