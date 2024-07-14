import { Stack } from "@mui/material";
import React from "react";
import AmountCard from "./AmountCard";

const AmountSection = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      style={{ margin: "10px 10px" }}
    >
      <AmountCard amount={25000} name={"Balance"} isClickable={false} />
      <AmountCard amount={3000000} name={"Savings"} isClickable={true} />
    </Stack>
  );
};

export default AmountSection;
