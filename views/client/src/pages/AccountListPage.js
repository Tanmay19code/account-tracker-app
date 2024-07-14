import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AccountCard from "../components/AccountCard";
import { Stack } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AccountListPage = () => {
  return (
    <Container>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
              flexWrap={"wrap"}
              
      >
        <AccountCard accountName={"KJSB"} CardIcon={AccountBalanceOutlinedIcon} />
        
        <AccountCard accountName={"KJSB"} CardIcon={AccountBalanceOutlinedIcon} />
        <AccountCard accountName={"HSBC"} CardIcon={SavingsOutlinedIcon} />
        <AccountCard accountName={"Add Account"} CardIcon={AddCircleOutlineIcon} />

      </Stack>
    </Container>
  );
};

export default AccountListPage;
