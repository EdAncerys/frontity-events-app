const Root = () => {
  return (
    <>
      You can edit your package in:
      <pre>packages/events-theme/src/index.js</pre>
    </>
  );
};

export default {
  name: "events-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {}
  },
  actions: {
    theme: {}
  }
};
