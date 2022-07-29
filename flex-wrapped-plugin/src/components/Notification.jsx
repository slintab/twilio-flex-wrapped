import React from "react";
import { Button, Typography } from "@material-ui/core";

export default function Notification({ openReport }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography align="right" sx={{ pr: 10 }} variant="subtitle1">
        Your Flex Year in Review is ready!
      </Typography>
      <Button variant="outlined" size="small" onClick={openReport}>
        Open
      </Button>
    </div>
  );
}
