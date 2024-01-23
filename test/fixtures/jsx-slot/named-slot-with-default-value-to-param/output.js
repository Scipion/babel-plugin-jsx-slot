const Main = () => <Box __slot_title={<h1>Main Title</h1>}>
    
  </Box>;
const Box = function (props) {
  return <div>
    {props.__slot_title}
    {props.__slot_content ? props.__slot_content : <>This is the default content</>}
  </div>;
};
