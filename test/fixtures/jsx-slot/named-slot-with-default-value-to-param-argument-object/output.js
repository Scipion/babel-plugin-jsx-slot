const Main = () => <Box __slot_title={<h1>Main Title</h1>}>
    
  </Box>;
const Box = function ({
  a,
  __slot_title,
  __slot_content
}) {
  return <div>
    {__slot_title}
    {__slot_content ? __slot_content : <>This is the default content</>}
  </div>;
};
