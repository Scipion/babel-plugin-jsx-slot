const Main = () => <Box>
    <h1>Main Title</h1>
  </Box>;
const Box = function ({
  a,
  children
}) {
  return <div>
    {children}
  </div>;
};
