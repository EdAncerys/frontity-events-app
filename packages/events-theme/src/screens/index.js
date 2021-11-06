// File: /packages/my-first-theme/src/components/index.js

import React from "react";
import { connect } from "frontity";
import Switch from "@frontity/components/switch";

import Header from "../components/header";
import Events from "./events";
import Post from "./post";
import Page from "./page";
import Login from "./login";
import Home from "./home";
// HELPERS ----------------------------------------------------------------
import Loading from "../components/loading";
import Error from "./error";

const Root = ({ state, actions }) => {
  const endPoint = state.router.link;
  const data = state.source.get(endPoint);
  // console.log("data ", data); // debug

  return (
    <div>
      <Header />

      <div className="main-container">
        <Switch>
          <Loading when={data.isFetching} />
          <Error when={data.isError} />

          <Events when={endPoint === "/events/"} />
          <Login when={endPoint === "/login/"} />
          <Home when={data.isHome} />
          <Post when={data.isPost} />
          <Page when={data.isPage} />
        </Switch>
      </div>
    </div>
  );
};

export default connect(Root);
