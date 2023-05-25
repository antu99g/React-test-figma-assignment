/* eslint-disable react/prop-types */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

// Common styles of table cells
const tableCellStyles = {
  fontSize: ".8rem",
  backgroundColor: "white",
  border: "1px solid rgb(245, 246, 250)",
};

export default function Preview({ channelData, pageSaved, handleEditChannel }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pageSaved) {
      setOpen(true);
    }
  }, [pageSaved]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontSize: ".7rem" }}
        >
          <AlertTitle sx={{ color: "green", fontSize: ".8rem" }}>
            Channels Configured
          </AlertTitle>
          Channels configured successfully.
        </Alert>
      </Snackbar>
      <TableContainer
        component={Stack}
        sx={{ width: "90%", overflow: "visible" }}
      >
        <Table
          sx={{
            backgroundColor: "rgba(229, 243, 255, 1)",
            borderRadius: "5px",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& > *": { padding: "1.2vh 0", fontSize: ".85rem", border: 0 },
              }}
            >
              <TableCell align="center" sx={{ width: "20%" }}>
                Channel
              </TableCell>
              <TableCell align="center" sx={{ width: "23%" }}>
                Primary Channel
              </TableCell>
              <TableCell align="center" sx={{ width: "23%" }}>
                Reference Channel
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
        </Table>

        {channelData.map((channel) => (
          <Table
            sx={{
              marginTop: "4vh",
              borderRadius: "5px",
            }}
            key={channel.channelName}
          >
            <TableBody>
              <TableRow>
                <TableCell
                  component="td"
                  align="center"
                  sx={{
                    ...tableCellStyles,
                    fontSize: ".9rem",
                    width: "20%",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: pageSaved ? "8px" : 0,
                  }}
                >
                  {channel.channelName}
                </TableCell>
                <TableCell
                  component="td"
                  align="center"
                  sx={{ ...tableCellStyles, fontSize: ".75rem", width: "23%" }}
                >
                  {channel.primary}
                </TableCell>
                <TableCell
                  component="td"
                  align="center"
                  sx={{ ...tableCellStyles, fontSize: ".75rem", width: "23%" }}
                >
                  {channel.reference}
                </TableCell>
                <TableCell
                  component="td"
                  align="center"
                  rowSpan={channel.backup.length + 1}
                  sx={{ ...tableCellStyles, borderRadius: "0 8px 8px 0" }}
                >
                  <Button
                    disabled={pageSaved}
                    variant="outlined"
                    onClick={handleEditChannel}
                    sx={{
                      fontSize: ".75rem",
                      textTransform: "none",
                    }}
                  >
                    Edit Channel
                  </Button>
                </TableCell>
              </TableRow>

              {channel.backup.length > 0 &&
                channel.backup.map((backup, index) => {
                  return (
                    <TableRow key={backup.id}>
                      {index === 0 && (
                        <TableCell
                          align="center"
                          sx={{
                            ...tableCellStyles,
                            color: "grey",
                            borderBottomLeftRadius: "8px",
                          }}
                          rowSpan={channel.backup.length}
                        >
                          Backup Channels
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{ ...tableCellStyles, color: "grey" }}
                      >
                        {backup.primary}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ ...tableCellStyles, color: "grey" }}
                      >
                        {backup.reference}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        ))}
      </TableContainer>

      <Box
        sx={{
          width: "90%",
          margin: "4vh 0 6vh",
          backgroundColor: "white",
          textAlign: "left",
          padding: "4vh 0",
          fontSize: ".8rem",
          borderRadius: "5px",
        }}
      >
        {pageSaved ? (
          <span style={{ marginLeft: "3vw" }}>
            Additional Settings: &emsp; Artifacts, &nbsp; Spindle
          </span>
        ) : (
          <>
            <span
              style={{ marginLeft: "3vw", marginRight: "1vw", color: "grey" }}
            >
              Output Format:
            </span>
            <span>Wanombi.xml</span>
          </>
        )}
      </Box>
    </>
  );
}
