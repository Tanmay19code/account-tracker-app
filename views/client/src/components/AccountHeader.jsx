import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const AccountHeader = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="flex-start"
      style={{ margin: "10px 10px" }}
    >
      <Box
        sx={{
          width: 190,
          height: 190,
          borderRadius: "20px",
          backgroundColor: "#62628C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountBalanceOutlinedIcon
          sx={{
            width: 0.9,
            height: 0.9,
            color: "#b1beeb",
          }}
          style={{
            display: "block",
            margin: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          width: 0.8,
        }}
      >
        <Stack
          // spacing={2}
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography
              component={"div"}
              sx={{
                color: "#E5AC69",
                fontFamily: "Corben",
                fontSize: 26,
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              KJSB
            </Typography>
            <BorderColorOutlinedIcon
              sx={{
                color: "#d3d3d3",
                fontSize: 20,
                alignSelf: "center",
                justifySelf: "center",
                "&:hover": {
                  color: "#5294E2",
                  transition: "0.2s",
                  transform: "scale(1.2)",
                }
              }}
              style={{
                marginLeft: "10px",
                marginTop: "3px",
                cursor: "pointer",
              }}
            />
          </Stack>
          <Typography
            component={"div"}
            sx={{
              color: "#5294E2",
              fontFamily: "Corben",
              fontSize: 20,
              letterSpacing: 1,
            }}
          >
            The Kalyan Janata Sahakari Bank
          </Typography>
          <Typography
            component={"div"}
            sx={{
              fontFamily: "Corben",
              fontSize: 20,
              letterSpacing: 1,
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
            iste eius optio, ratione recusandae odit! Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Accusantium, vitae tenetur animi
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AccountHeader;
