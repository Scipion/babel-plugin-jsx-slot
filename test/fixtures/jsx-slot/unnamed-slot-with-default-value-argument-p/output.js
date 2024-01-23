const Main = () => <Box>
    <h1>Main Title</h1>
  </Box>;
const Box = function (p) {
  return <div>
    {p.children ? p.children : <>Default value</>}
  </div>;
};
