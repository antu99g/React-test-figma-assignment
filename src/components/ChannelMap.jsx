/* eslint-disable react/prop-types */
import { Checkbox, Container, Grid } from "@mui/material";
import { ChannelData } from "./";

export default function ChannelMap({
  channelData,
  handleSelectChannelRef,
  handleBackupSelect,
  handleDeleteBackup,
  addBackupChannel,
}) {
  return (
    <Container
      sx={{
        width: "90%",
        padding: "0 !important",
        fontSize: ".9rem",
      }}
    >
      <Grid
        container
        sx={{
          paddingLeft: "2vw",
          fontSize: ".7rem",
          backgroundColor: "rgba(229, 243, 255, 1)",
          borderRadius: "5px",
        }}
      >
        <Grid item xs={2.1}>
          <h3>Channel</h3>
        </Grid>
        <Grid item xs={3.5}>
          <h3>Primary Channel (default select)</h3>
        </Grid>
        <Grid item xs>
          <h3>Reference Channel (default N/A)</h3>
        </Grid>
      </Grid>

      {channelData.map((channel) => {
        return (
          <ChannelData
            channel={channel}
            handleSelectChannelRef={handleSelectChannelRef}
            addBackupChannel={addBackupChannel}
            handleBackupSelect={handleBackupSelect}
            handleDeleteBackup={handleDeleteBackup}
            key={channel.channelName}
          />
        );
      })}

      <Grid
        container
        sx={{
          marginTop: "3vh",
          padding: "1.2vh 0 1.2vh 2vw",
          backgroundColor: "white",
          borderRadius: "5px",
          alignItems: "center",
          fontSize: ".8rem",
        }}
      >
        <Grid item xs={2.2}>
          <h4>Additional Settings</h4>
        </Grid>

        <Grid item xs>
          <span style={{ marginRight: "10px" }}>
            <Checkbox />
            Spindle
          </span>
          <span>
            <Checkbox />
            Artifacts
          </span>
        </Grid>
      </Grid>
    </Container>
  );
}
