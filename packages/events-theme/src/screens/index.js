// File: /packages/my-first-theme/src/components/index.js

import React from "react";
import { connect, Global, css, styled } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import globalCSS from "../css/bootstrap.min.css";

import List from "./list";
import Post from "./post";
import Page from "./page";
import Header from "../components/header";
// HELPERS ----------------------------------------------------------------
import Loading from "../components/loading";
import Error from "./error";

const Root = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  // console.log("data ", data); // debug

  return (
    <div>
      <Global
        styles={css`
          ${globalCSS}
        `}
      />
      <Header />

      <Main>
        <h1>index.js edited</h1>
        <Switch>
          <Loading when={data.isFetching} />
          <Error when={data.isError} />

          <List when={data.isArchive} />
          <Post when={data.isPost} />
          <Page when={data.isPage} />
          <Page when={data.isDestinations} />
        </Switch>
      </Main>
    </div>
  );
};

export default connect(Root);

const Main = styled.main`
  max-width: 800px;
  padding: 1em;
  margin: auto;

  img {
    max-width: 100%;
  }
  h2 {
    margin: 0.5em 0;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }
  figcaption {
    color: #828282;
    font-size: 0.8em;
    margin-bottom: 1em;
  }
`;
