const Main = () => (
  <Box>
    <p slot="content" className="big big-box">
      Lorem ipsum
    </p>
    <h1 slot="title">Main Title</h1>
  </Box>
);

const Box = () => <div>no slot component</div>;
