import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import TransactionDateTitle from "./TransactionDateTitle";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  return (
    <Box>
      <Typography>Transactions</Typography>
      <Container>
        <Stack
          spacing={2}
          direction="column"
          // justifyContent="space-between"
          style={{ margin: "50px 10px" }}
        >
          <TransactionDateTitle />
          <TransactionItem
            transactionType="debit"
            transactionAmount="1,30,000/-"
            transactionNote="Payment for car"
            transactionAccount="Tanmay Mutalik"
          />
          <hr
            style={{
              width: "100%",
              border: "1px solid #D3D3D3",
            }}
          />
          <TransactionItem
            transactionType="credit"
            transactionAmount="20,000/-"
            transactionNote="Stipend"
            transactionAccount="Tanmay Mutalik"
          />
          <hr
            style={{
              width: "100%",
              border: "1px solid #D3D3D3",
            }}
          />
          <TransactionItem />
          <TransactionDateTitle />
          <TransactionDateTitle />
        </Stack>
      </Container>
    </Box>
  );
};

export default TransactionList;
