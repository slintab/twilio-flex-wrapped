import React from "react";
import { Typography, Grid } from "@material-ui/core";

export default function ReportElement({ caption, value, Icon }) {
  return (
    <Grid item xs={6}>
      <Grid container alignItems="center" justify="space-around">
        <Grid item>
          <Icon style={{ fontSize: 65 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            {value}
          </Typography>
          <Typography variant="subtitle1">{caption}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
