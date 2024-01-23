const Main = () => <Box __slot_content={<p>Lorem ipsum</p>} __slot_title={<h1>Main Title</h1>}>
    
    
  </Box>;
const Box = function (p = {
  a: 1
}) {
  return <div>
    {p.__slot_title}
    {p.__slot_content}
  </div>;
};