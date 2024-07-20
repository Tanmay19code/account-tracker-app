import React from "react";
import { Box, Typography } from "@mui/material";

const TransactionDateTitle = () => {
  return (
    <Box
      //   add bottom border
      sx={{
        borderBottom: "1px solid #E5AC69",
        width: 0.45,
        padding: "5px 0",
        display: "flex",
        justifyContent: "space-between",
      }}
      style={{
        margin: "10px 0px",
      }}
    >
      <Typography
        component={"div"}
        sx={{
          color: "#E5AC69",
          fontFamily: "Amita",
          fontSize: 26,
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      >
        01/07/2024
      </Typography>
    </Box>
  );
};

export default TransactionDateTitle;
