const CustomDivider = ({ padding }) => {
  return (
    <div className="" style={{ padding: padding ? padding : "10px 0" }}>
      <div
        className="divider"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#EBEEEF",
        }}
      ></div>
    </div>
  );
};

export default CustomDivider;
