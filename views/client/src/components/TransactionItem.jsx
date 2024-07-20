import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const TransactionItem = ({
  transactionType,
  transactionAmount,
  transactionNote,
  transactionAccount,
}) => {
  let amount = "";
  if (transactionType === "debit") {
    amount = "- " + transactionAmount;
  } else {
    amount = "+ " + transactionAmount;
  }
  return (
    <Box
      sx={{
        width: 1.0,
        // paddingBottom: "20px",
        // display: "flex",
        // justifyContent: "flex-start",
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        style={{
          width: "100%",
          margin: "15px 0px",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            border: "3px solid #FFEB3B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            height: "unset",
            width: "8%",
            aspectRatio: "1/1",
          }}
        >
          <Typography
            component={"div"}
            sx={{
              color: "#FFEB3B",
              fontFamily: "Lemonada",
              fontSize: 35,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            TM
          </Typography>
        </Box>
        <Box
          style={{
            width: "62%",
          }}
        >
          <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              component={"div"}
              sx={{
                color: "#5294E2",
                fontFamily: "Corben",
                fontSize: 30,
                letterSpacing: 2,
              }}
            >
              {transactionNote}
            </Typography>
            <Typography
              component={"div"}
              sx={{
                color: "#FFEB3B",
                fontFamily: "Corben",
                fontSize: 18,
                letterSpacing: 2,
              }}
              style={{
                marginTop: "3px",
              }}
            >
              {transactionAccount}
            </Typography>
          </Stack>
        </Box>
        <Box
          style={{
            width: "30%",
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Typography
              component={"div"}
              sx={{
                color: transactionType === "debit" ? "#FF5925" : "#5FEA65",
                fontFamily: "Corben",
                fontSize: 30,
                letterSpacing: 2,
              }}
              style={{
                fontWeight: "1200",
              }}
            >
              {amount}
            </Typography>
            <BorderColorOutlinedIcon
              sx={{
                color: "#d3d3d3",
                fontSize: 25,
                alignSelf: "center",
                justifySelf: "center",
                "&:hover": {
                  color: "#5294E2",
                  transition: "0.2s",
                  transform: "scale(1.2)",
                },
              }}
              style={{
                marginLeft: "10px 20px",
                // marginTop: "3px",
                cursor: "pointer",
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TransactionItem;
