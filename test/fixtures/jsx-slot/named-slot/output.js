const Main = () => <Box __slot_content={<p>Lorem ipsum</p>} __slot_title={<h1>Main Title</h1>}>
    
    
  </Box>;
const Box = function (props) {
  return <div>
    {props.__slot_title}
    {props.__slot_content}
  </div>;
};