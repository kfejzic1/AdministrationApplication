import "../../App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { TransactionsList } from "./TransactionsList";
import { Home } from "./Home";
import { Account } from "./Account";

export const Mainpage = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
};
