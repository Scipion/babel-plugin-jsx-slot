const Main = () => <Box>
    <h1>Main Title</h1>
  </Box>;
const Box = function (props) {
  return <div>
    {props.children ? props.children : <>Default value</>}
  </div>;
};
