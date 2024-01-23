const Main = () => (
  <Box>
    <h1>Main Title</h1>
  </Box>
);

const Box = () => (
  <div>
    <slot></slot>
  </div>
);
