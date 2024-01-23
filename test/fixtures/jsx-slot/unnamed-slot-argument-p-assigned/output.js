const Main = () => <Box>
    <h1>Main Title</h1>
  </Box>;
const Box = function (p = {
  a: 1
}) {
  return <div>
    {p.children}
  </div>;
};
