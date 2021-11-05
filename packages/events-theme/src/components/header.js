import React from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import HeadComponent from "./headComponent";

import { colors } from "../config/colors";

const Header = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  // HELPERS --------------------------------
  const ServeLoginAction = () => {
    return;
    {
      state.theme.isUrlVisible ? (
        <>
          Current URL: {state.router.link}{" "}
          <Button onClick={actions.theme.toggleUrl}>&#x3c; Hide URL</Button>
        </>
      ) : (
        <Button onClick={actions.theme.toggleUrl}>Show URL &#x3e;</Button>
      );
    }
  };

  return (
    <>
      <HeadComponent />
      <div style={styles.header}>
        <div style={styles.wrapper}>
          <div style={styles.titleWrapper}>
            <p className="text-primary fs-4 m-2">Frontity Event App</p>
          </div>
          <div style={styles.menu}>
            <Link className="m-2" link="/">
              Home
            </Link>
            <Link className="btn btn-primary m-2" link="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    flex: 1,
    backgroundColor: `${colors.white}`,
    borderBottom: `1px solid ${colors.silver}`,
  },
  wrapper: {
    display: "flex",
    flex: 1,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2em",
    fontWeight: "400",
    color: `${colors.primary}`,
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "0.5em 2em",
    borderRight: `1px solid ${colors.silver}`,
  },
  menu: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default connect(Header);
