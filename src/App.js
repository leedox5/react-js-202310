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
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./components/auth";
import { OptProvider } from "./components/counter";
import { SearchProvider } from "./components/search";

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
    /*
    const refreshToken = localStorage.getItem("refresh");
    console.log(refreshToken);
    if (refreshToken) {
      getHome().then((res) => {
        console.log(res);
        setData(res);
      });
    }
    */
  }, []);

  return (
    <AuthProvider>
      <SearchProvider>
        <OptProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route
                  path="mypage"
                  element={
                    <RequireAuth>
                      <Page20231001 />
                    </RequireAuth>
                  }
                />
                <Route path="detail/:id" element={<Page20231002 />} />
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </OptProvider>
      </SearchProvider>
    </AuthProvider>
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
