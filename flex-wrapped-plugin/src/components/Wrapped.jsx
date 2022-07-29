import React from "react";
import Notification from "./Notification";
import Report from "./Report";

export default function Wrapped({ worker }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Notification openReport={handleOpen} />
      <Report open={open} closeReport={handleClose} worker={worker} />
    </div>
  );
}
