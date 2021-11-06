import React from "react";
import { connect, Global, css } from "frontity";
import Link from "@frontity/components/link";
import HeadComponent from "./headComponent";
import bootStrapCSS from "../css/bootstrap.min.css";
import globalCSS from "../css/main.css";

import { colors } from "../config/colors";

const Header = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const isLoggedIn = state.theme.isLoggedIn;

  // HELPERS --------------------------------
  const handleLogOut = () => {
    actions.theme.setLogin(false);
  };

  const ServeAuthAction = () => {
    if (!isLoggedIn)
      return (
        <div>
          <Link className="btn btn-primary m-2" link="/login">
            Login
          </Link>
        </div>
      );
    if (isLoggedIn)
      return (
        <div>
          <Link
            className="btn btn-danger m-2"
            link="/login"
            onClick={handleLogOut}
          >
            Logout
          </Link>
        </div>
      );
  };

  return (
    <>
      <Global
        styles={css`
          ${bootStrapCSS}, ${globalCSS}
        `}
      />
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
            <Link className="m-2" link="/events">
              Events
            </Link>
            <Link className="m-2" link="/create-account">
              New Account
            </Link>
            <ServeAuthAction />
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
