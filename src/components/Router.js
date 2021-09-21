import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MyCase from "routes/MyCase";
import MyCourt from "routes/MyCourt";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navigation userObj={userObj} />}
        <main>
          <Switch>
            {isLoggedIn ? (
              <>
                <Route exact path="/">
                  <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
                <Route path="/mycourt">
                  <MyCourt userObj={userObj} />
                </Route>
                <Route path="/mycase">
                  <MyCase userObj={userObj} />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Auth />
                </Route>
              </>
            )}
          </Switch>
          <footer>
            <small>
              © 2021 made with by -{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://azouaoui.netlify.com"
              >
                Peter Han
              </a>
            </small>
            <br />
          </footer>
        </main>
      </div>
    </Router>
  );
};

export default AppRouter;
