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
