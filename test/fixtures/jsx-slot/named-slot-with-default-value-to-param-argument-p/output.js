const Main = () => <Box __slot_title={<h1>Main Title</h1>}>
    
  </Box>;
const Box = function (p) {
  return <div>
    {p.__slot_title}
    {p.__slot_content ? p.__slot_content : <>This is the default content</>}
  </div>;
};
