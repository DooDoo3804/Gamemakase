import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import MainHeader from "./components/MainHeader";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Test from "./pages/Test";
import TestResult from "./pages/TestResult";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import ServerError from "./pages/ServerError";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainHeader></MainHeader>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:gameId" element={<Detail />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/test" element={<Test />} />
            <Route path="/testResult/:resultId" element={<TestResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
