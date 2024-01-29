export const Box = () => {
  const styles = {
    border: "2px solid red",
    boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
    backgroundColor: "rgb(231, 166, 26)",
    padding: "2rem",
    color: "#203000",
  };

  const headerStyles = {
    color: "#005380",
    textDecoration: "underline",
  };
  return (
    <div style={styles}>
      <header style={headerStyles}>
        <slot name="title" />
      </header>
      <slot name="content"></slot>
    </div>
  );
};
