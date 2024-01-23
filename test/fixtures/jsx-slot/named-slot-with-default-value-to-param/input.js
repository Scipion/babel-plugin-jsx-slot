const Main = () => (
  <Box>
    <h1 slot="title">Main Title</h1>
  </Box>
);

const Box = () => (
  <div>
    <slot name="title"></slot>
    <slot name="content">This is the default content</slot>
  </div>
);
