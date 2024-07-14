import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AmountCard = ({ amount, name, isClickable }) => {
  const getAmountWithComa = (amount) => {
    return amount.toLocaleString("en-IN").concat(" /-");
  };
  return (
    <Card
      sx={{
        width: 300,
        height: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        backgroundColor: "#1E1E2F",
        borderRadius: "20px",
        boxShadow: "0px 1.5px 2.5px 1.5px rgba(136, 171, 240, 1)",
        // if isClickable is true, then add cursor pointer
        cursor: isClickable ? "pointer" : "default",
        "&:hover": {
          backgroundColor: isClickable ? "#2F2F3F" : "#1E1E2F",
        },
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="left"
        spacing={1}
        style={{ margin: "10px 25px" }}
      >
        <Typography
          component={"div"}
          sx={{
            color: "#5294E2",
            // fontWeight: "bold",
            fontSize: 30,
            fontFamily: "Corben",
            width: "fit-content",
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {name}
          {isClickable ? (
            <ArrowForwardIcon
              sx={{ color: "#5294E2", fontSize: 30 }}
              style={{
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                marginBottom: "3px",
                marginLeft: "10px",
              }}
            />
          ) : (
            " :"
          )}
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Typography
            component={"div"}
            sx={{
              color: "#5294E2",
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Amiko",
            }}
          >
            ₹
          </Typography>
          <Typography
            component={"div"}
            sx={{
              color: "#D3D3D3",
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Amiko",
            }}
          >
            {getAmountWithComa(amount)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AmountCard;
