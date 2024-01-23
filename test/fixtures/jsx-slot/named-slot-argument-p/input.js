const Main = () => (
  <Box>
    <p slot="content">Lorem ipsum</p>
    <h1 slot="title">Main Title</h1>
  </Box>
);

const Box = (p) => (
  <div>
    <slot name="title"></slot>
    <slot name="content"></slot>
  </div>
);
