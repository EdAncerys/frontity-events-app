import { connect, Head } from "frontity";

const HeadComponent = ({ state }) => {
  return (
    <Head>
      <title>Events App</title>
      <meta
        name="description"
        content="WordPress installation for Frontity development"
      />
      <html lang="en" />
    </Head>
  );
};

export default connect(HeadComponent);
