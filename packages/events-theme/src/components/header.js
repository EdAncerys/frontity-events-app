import React from "react";
import { connect, Head, styled } from "frontity";
import Link from "@frontity/components/link";
import HeadComponent from "./headComponent";

const Header = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <HeaderContainer>
      <HeaderContent>
        <p style={styles.siteHeader}>Frontity Event App</p>
        {state.theme.isUrlVisible ? (
          <>
            Current URL: {state.router.link}{" "}
            <Button onClick={actions.theme.toggleUrl}>&#x3c; Hide URL</Button>
          </>
        ) : (
          <Button onClick={actions.theme.toggleUrl}>Show URL &#x3e;</Button>
        )}
        <Menu>
          <Link link="/">Home</Link>
          <Link link="/about-us">About Us</Link>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

const styles = {
  siteHeader: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
};

const HeaderContainer = styled.header`
  background-color: #e5edee;
  border-width: 0 0 8px 0;
  border-style: solid;
  border-color: ${({ isHome }) => (isHome ? "#f2f2" : "#999")};
`;

const HeaderContent = styled.div`
  max-width: 800px;
  padding: 2em 1em;
  margin: auto;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  & > a {
    margin-right: 1em;
    color: steelblue;
    text-decoration: none;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: #aaa;
  :hover {
    cursor: pointer;
    color: #888;
  }
`;

export default connect(Header);
