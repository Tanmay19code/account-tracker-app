import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const AccountCard = ({ CardIcon, accountName }) => {
  return (
    <Card
      sx={{
        width: 215,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2F",
        borderRadius: "20px",
        "&:hover": {
          boxShadow: "0 0 10px 0 #b1beeb",
          ".hover-text": {
            // slightly increase font size
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          },
        },
        ".hover-text": {
          transition: "transform 0.3s ease",
        },
      }}
      style={{
        margin: "10px 10px",
        cursor: "pointer",
        // on hover add boxShadow
      }}
    >
      <Stack
        spacing={2}
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
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
          <CardIcon
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
        <Box style={{ marginTop: "0px" }}>
          <Typography
            component="div"
            sx={{
              color: "#5294E2",
              textAlign: "center",
              fontFamily: "Corben",
              fontSize: 26,
              alignSelf: "center",
            }}
            className="hover-text"
          >
            {accountName}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default AccountCard;
