const Main = () => (
  <Box>
    <h1>Main Title</h1>
  </Box>
);

const Box = ({a}) => (
  <div>
    <slot>Default value</slot>
  </div>
);
