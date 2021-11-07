import Root from "./screens/index";

const myFirstTheme = {
  name: "event-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      jwt: null,
      isLoggedIn: false,
    },
  },
  actions: {
    theme: {
      beforeCSR: async ({ state, actions }) => {
        console.log("beforeCSR triggered"); // debug
        if (document.cookie) state.theme.isLoggedIn = true;
      },
      setLogin:
        ({ state }) =>
        (value) => {
          state.theme.isLoggedIn = value;
        },
      setTaken:
        ({ state }) =>
        (value) => {
          state.theme.jwt = value;
        },
    },
  },
};

export default myFirstTheme;
