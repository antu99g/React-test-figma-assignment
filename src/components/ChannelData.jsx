/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { BackupChannel } from "./";

export default function ChannelData({
  channel,
  handleSelectChannelRef,
  addBackupChannel,
  handleBackupSelect,
  handleDeleteBackup,
}) {
  // State to show and hide backup channels of a main-channel
  const [showBackupChannels, setShowBackupChannels] = useState(false);

  // Handler of a common button to add, show and hide backups
  const handleCommonBtnClick = () => {
    if (channel.backup.length > 0) {
      setShowBackupChannels((prevState) => !prevState);
    } else {
      addBackupChannel(channel.channelName);
      setShowBackupChannels(true);
    }
  };

  // Function to delete a backup channel
  const handleDeleteBtnClick = (id) => {
    handleDeleteBackup(channel.channelName, id);
    setShowBackupChannels(channel.backup.length > 0);
  };

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: "3vh",
          paddingLeft: "2vw",
          backgroundColor: "white",
          borderRadius: showBackupChannels ? "5px 5px 0 0" : "5px",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <span>{channel.channelName}</span>
        </Grid>

        <Grid item xs={3.5}>
          <FormControl sx={{ m: 2, width: "70%" }} size="small">
            {channel.primary === "" && (
              <InputLabel shrink={false} disableAnimation={true}>
                Select Channel
              </InputLabel>
            )}
            <Select
              value={channel.primary}
              displayEmpty
              onChange={(e) =>
                handleSelectChannelRef(
                  channel.channelName,
                  "primary",
                  e.target.value
                )
              }
            >
              <MenuItem value={"C3:A2"}>C3:A2</MenuItem>
              <MenuItem value={"EOCG"}>EOCG</MenuItem>
              <MenuItem value={"MMCG"}>MMCG</MenuItem>
              <MenuItem value={"C4:A1"}>C4:A1</MenuItem>
              <MenuItem value={"EOGL"}>EOGL</MenuItem>
              <MenuItem value={"NULL"}>NULL</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3.5}>
          <FormControl sx={{ m: 2, width: "70%" }} size="small">
            {channel.reference === "" && (
              <InputLabel shrink={false} disableAnimation={true}>
                Select Channel
              </InputLabel>
            )}
            <Select
              value={channel.reference}
              displayEmpty
              onChange={(e) =>
                handleSelectChannelRef(
                  channel.channelName,
                  "reference",
                  e.target.value
                )
              }
            >
              <MenuItem value="C3:A2">C3:A2</MenuItem>
              <MenuItem value="EOCG">EOCG</MenuItem>
              <MenuItem value="MMCG">MMCG</MenuItem>
              <MenuItem value="C4:A1">C4:A1</MenuItem>
              <MenuItem value="EOGL">EOGL</MenuItem>
              <MenuItem value="NULL">NULL</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs>
          <Button
            size="small"
            variant="text"
            // variant="contained"
            // sx={textButtonStyles}
            onClick={handleCommonBtnClick}
          >
            {!showBackupChannels && channel.backup.length < 1 && (
              <Add sx={{ margin: "-2px 2px 0 0", fontSize: ".8rem" }} />
            )}

            <span>
              {showBackupChannels
                ? `Hide backup channels (${channel.backup.length})`
                : channel.backup.length > 0
                ? `View backup channels (${channel.backup.length})`
                : "Add Backup Channels"}
            </span>
          </Button>
        </Grid>
      </Grid>

      {showBackupChannels &&
        channel.backup.length > 0 &&
        channel.backup.map((backup, index) => {
          return (
            <BackupChannel
              backupData={backup}
              channelName={channel.channelName}
              handleBackupSelect={handleBackupSelect}
              handleDeleteBtnClick={handleDeleteBtnClick}
              key={index}
            />
          );
        })}

      {showBackupChannels && (
        <Grid container sx={{ backgroundColor: "rgba(246, 246, 246, 1)" }}>
          <Grid item xs={2.4} />

          <Grid item xs>
            <Button
              size="small"
              variant="text"
              onClick={() => addBackupChannel(channel.channelName)}
            >
              <Add sx={{ margin: "-2px 2px 0 0", fontSize: ".8rem" }} />
              <span>Add Backup Channels</span>
            </Button>
          </Grid>
        </Grid>
      )}
    </>

    // <tr className={styles.channelRow}>
    //   <td>
    //     <span>{channel}</span>
    //   </td>

    //   <td>
    //     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    //       <InputLabel id="demo-simple-select-label">Select Channel</InputLabel>
    //       <Select
    //         //   labelId="demo-simple-select-label"
    //         //   id="demo-simple-select"
    //         //   value={age}
    //         label="Age"
    //         onChange={handleSelectOption}
    //         autoWidth
    //       >
    //         <MenuItem value={10}>Ten</MenuItem>
    //         <MenuItem value={20}>Twenty</MenuItem>
    //         <MenuItem value={30}>Thirty</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </td>

    //   <td>
    //     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    //       <InputLabel id="demo-simple-select-label">Select Channel</InputLabel>
    //       <Select
    //         //   labelId="demo-simple-select-label"
    //         //   id="demo-simple-select"
    //         //   value={age}
    //         label="Age"
    //         onChange={handleSelectOption}
    //         autoWidth
    //       >
    //         <MenuItem value={10}>Ten</MenuItem>
    //         <MenuItem value={20}>Twenty</MenuItem>
    //         <MenuItem value={30}>Thirty</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </td>

    //   <td>
    //     <Button size="small" variant="text" startIcon={<Add />}>
    //       <span>Add backup Channels</span>
    //     </Button>
    //   </td>
    // </tr>
  );
}
