/* eslint-disable react/prop-types */
import { Delete } from "@mui/icons-material";
import { Button, FormControl, MenuItem, Select, Grid } from "@mui/material";

export default function BackupChannel({
  backupData,
  channelName,
  handleBackupSelect,
  handleDeleteBtnClick,
}) {
  return (
    <Grid
      container
      sx={{
        paddingLeft: "2vw",
        backgroundColor: "rgba(246, 246, 246, 1)",
        borderRadius: "0 0 5px 5px",
        alignItems: "center",
      }}
    >
      <Grid item xs={2} />

      <Grid item xs={3.5}>
        <FormControl sx={{ m: 2, width: "70%" }} size="small">
          <Select
            value={backupData.primary}
            onChange={(e) =>
              handleBackupSelect(
                channelName,
                backupData.id,
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
          <Select
            value={backupData.reference}
            onChange={(e) =>
              handleBackupSelect(
                channelName,
                backupData.id,
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
          color="error"
          onClick={() => handleDeleteBtnClick(backupData.id)}
        >
          <Delete sx={{ margin: "-2px 2px 0 0", fontSize: ".8rem" }} />
          <span>Delete</span>
        </Button>
      </Grid>
    </Grid>
  );
}
