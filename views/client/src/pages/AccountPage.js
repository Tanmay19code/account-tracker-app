import { Box, Container, Stack } from "@mui/material";
import React from "react";
import AccountHeader from "../components/AccountHeader";
import AmountSection from "../components/AmountSection";

const AccountPage = () => {
  return (
    <Container>
      <AccountHeader />
      <br />
      <AmountSection />
    </Container>
  );
};

export default AccountPage;
