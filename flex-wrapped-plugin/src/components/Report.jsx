import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography, Modal, Grid } from "@material-ui/core";
import { Icon } from "@twilio/flex-ui";

import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
import TimerOutlinedIcon from "@material-ui/icons/TimerOutlined";

import ReportElement from "./ReportElement";

const FUNCTION_URL = "https://<YOUR_FUNCTION_URL>";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 650,
  backgroundImage: `url(${"/images/report_bg.png"})`,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundPosition: "99% 120%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  p: 4,
};

export default function Report({ open, closeReport, worker }) {
  const [reportData, setReportData] = React.useState([]);
  const icons = [
    AssignmentTurnedInOutlinedIcon,
    RecordVoiceOverOutlinedIcon,
    TimerOutlinedIcon,
    ForumOutlinedIcon,
  ];

  useEffect(() => {
    async function fetchReportData() {
      const url = FUNCTION_URL + "?workerSid=" + worker.sid;
      const resp = await axios.get(url);

      if (resp.status === 200 && resp.data) {
        setReportData(Object.entries(resp.data));
      }
    }

    fetchReportData();
  }, []);

  return (
    <Modal open={open} onClose={closeReport}>
      <Box sx={style}>
        <Icon icon="DataBold" />
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          align="center"
        >
          Flex Wrapped
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="h2"
          align="center"
        >
          2022
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
            color="secondary"
          >
            {worker.attributes.full_name.split(/\s(.+)/)[0]}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            , your year in review is here.
          </Typography>
        </div>
        <Grid
          container
          spacing={7}
          alignContent="center"
          justify="space-around"
        >
          <Grid item xs={12}></Grid>
          {reportData.map((k, i) => {
            return (
              <ReportElement
                key={i}
                caption={k[0]}
                value={k[1]}
                Icon={icons[i]}
              />
            );
          })}
        </Grid>
      </Box>
    </Modal>
  );
}
