import { connect, Head } from "frontity";

const HeadComponent = ({ state }) => {
  return (
    <Head>
      <title>My First Frontity Theme</title>
      <meta
        name="description"
        content="Based on the Frontity step by step tutorial"
      />
    </Head>
  );
};

export default connect(HeadComponent);
