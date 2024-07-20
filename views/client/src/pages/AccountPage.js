import { Box, Container, Stack } from "@mui/material";
import React from "react";
import AccountHeader from "../components/AccountHeader";
import AmountSection from "../components/AmountSection";
import TransactionList from "../components/TransactionList";

const AccountPage = () => {
  return (
    <Container>
      <AccountHeader />
      <br />
      <AmountSection />
      <br />
      <h1>Transactions</h1>
      <TransactionList/>
    </Container>
  );
};

export default AccountPage;
