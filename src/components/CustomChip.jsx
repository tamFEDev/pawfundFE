import { Typography } from "@mui/material";
import { fontFamily } from "../constants";

const CustomChip = ({
  title,
  bgColor,
  index,
  fontSize,
  fontWeight,
  color,
  border,
}) => {
  return (
    <Typography
      variant="body1"
      color={color}
      sx={{
        bgcolor: bgColor,
        borderRadius: "10px",
        display: "inline-block",
        p: "7px 14px",
        border: border,
      }}
      textAlign={"center"}
      fontSize={fontSize}
      fontWeight={fontWeight}
      key={index}
      fontFamily={fontFamily.msr}
    >
      {title}
    </Typography>
  );
};

export default CustomChip;
