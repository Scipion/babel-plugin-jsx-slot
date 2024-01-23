const Main = () => (
  <Box>
    <h1>Main Title</h1>
  </Box>
);

const Box = (p = { a: 1 }) => (
  <div>
    <slot></slot>
  </div>
);
