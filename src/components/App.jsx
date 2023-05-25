import { useEffect, useState } from "react";
import "../styles/App.css";
import { Sidebar, Upload, ChannelMap, Preview } from "./";
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
} from "@mui/material";
import { schema } from "../schema";
import theme from "../themes";

// Common button styles (in footer)
const buttonStyle = {
  fontSize: ".8rem",
  fontWeight: "700",
  textTransform: "none",
  padding: "1.2vh 3vw",
};

function App() {
  // All setps
  const steps = ["Upload ETFs", "Map Channels", "Save & Preview"];

  // All pages according to steps
  const pages = ["upload", "map", "preview"];

  // const [currentSection, setCurrentSection] = useState("montages");

  // Current section in sidebar
  const [currentSection] = useState("montages"); // Removed set-state function to avoid warnings

  // Index of current-page from pages array
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Current page
  const [currentPage, setCurrentPage] = useState(pages[currentPageIndex]);

  // Data of mapping of all channels
  const [channelData, setChannelData] = useState(() => {
    const channels = [];
    schema.channels.forEach((channel) => {
      channels.push({
        channelName: channel,
        primary: "",
        reference: "",
        backup: [],
      });
    });
    return channels;
  });

  // Function to map a main-channel
  const handleSelectChannelRef = (channelName, key, value) => {
    setChannelData((prevData) =>
      prevData.map((channel) => {
        if (channel.channelName === channelName) {
          // Create a new object with the updated field
          return { ...channel, [key]: value };
        }
        return channel;
      })
    );
  };

  // Function to add a backup channel
  const addBackupChannel = (channelName) => {
    const updatedData = [...channelData];
    const channelToUpdate = updatedData.find(
      (channel) => channel.channelName === channelName
    );
    let targetIndex;
    if (channelToUpdate) {
      // index of the current updating channel in state
      targetIndex = updatedData.indexOf(channelToUpdate);
      // adding backup in target channel
      channelToUpdate.backup = [
        ...channelToUpdate.backup,
        {
          id: Date.now(),
          primary: "NULL",
          reference: "NULL",
        },
      ];
    }

    // replace updated channel and set state
    updatedData[targetIndex] = channelToUpdate;
    setChannelData(updatedData);
  };

  // Function to map a backup-channel
  const handleBackupSelect = (channelName, backupId, key, value) => {
    const updatedData = [...channelData];
    const channelToUpdate = updatedData.find(
      (channel) => channel.channelName === channelName
    );
    let targetIndex;
    if (channelToUpdate) {
      // index of the current updating channel in state
      targetIndex = updatedData.indexOf(channelToUpdate);
      // update mapping in backup of target channel
      channelToUpdate.backup.forEach((backup) => {
        if (backup.id === backupId) {
          backup[key] = value;
        }
      });
    }
    // replace updated channel and set state
    updatedData[targetIndex] = channelToUpdate;
    setChannelData(updatedData);
  };

  // Function to delete a backup channel
  const handleDeleteBackup = (channelName, backupId) => {
    const updatedData = [...channelData];
    const channelToUpdate = updatedData.find(
      (channel) => channel.channelName === channelName
    );
    let targetIndex;
    if (channelToUpdate) {
      // index of the current updating channel in state
      targetIndex = updatedData.indexOf(channelToUpdate);
      // removing backup from target channel
      channelToUpdate.backup = channelToUpdate.backup.filter(
        (backup) => backup.id !== backupId
      );
    }
    // replace updated channel and set state
    updatedData[targetIndex] = channelToUpdate;
    setChannelData(updatedData);
  };

  // Function to set all unselected field as null in preview page
  const handleUnselectedChannels = () => {
    let copyData = [...channelData];
    // updating all empty primary and reference channel field from each channel
    const updatedData = copyData.map((channel) => {
      if (channel.primary === "") {
        channel.primary = "NULL";
      }
      if (channel.reference === "") {
        channel.reference = "NULL";
      }
      return channel;
    });

    setChannelData(updatedData);
  };

  useEffect(() => {
    if (currentPageIndex < pages.length) {
      // set all unselected fields as null in preview page
      if (pages[currentPageIndex] === "preview") {
        handleUnselectedChannels();
      }
      // change current page on page-index change
      setCurrentPage(() => pages[currentPageIndex]);
    }
  }, [currentPageIndex]);

  // Function to handle next (or save) button click in footer
  const handleNextBtnClick = () => {
    if (currentPageIndex < pages.length) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle back-button click in footer
  const handleBackBtnClick = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <main className="app">
      <ThemeProvider theme={theme}>
        <Sidebar currentSection={currentSection} />

        <div className="mainContainer">
          <header>
            <h2>Test_Study</h2>
            <span>
              {/* <img src="/src/assets/user-icon.png" alt="avatar" /> */}
              <img src="/user-icon.png" alt="avatar" />
              <span>Ankit Brijwasi</span>
              <ExpandMore />
            </span>
          </header>

          <Box
            sx={{
              width: "90%",
              padding: "2vh 0 1vh",
              marginBottom: "4vh",
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "5px",
            }}
          >
            <Stepper activeStep={currentPageIndex} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {currentPage === "upload" && <Upload />}

          {currentPage === "map" && (
            <ChannelMap
              channelData={channelData}
              handleSelectChannelRef={handleSelectChannelRef}
              handleBackupSelect={handleBackupSelect}
              handleDeleteBackup={handleDeleteBackup}
              addBackupChannel={addBackupChannel}
            />
          )}

          {currentPage === "preview" && (
            <Preview
              channelData={channelData}
              pageSaved={currentPageIndex === pages.length}
              handleEditChannel={handleBackBtnClick}
            />
          )}

          {currentPageIndex < pages.length && (
            <footer>
              <span>
                <Button
                  variant="outlined"
                  sx={{
                    ...buttonStyle,
                    color: "rgba(149, 149, 149, 1)",
                    border: "1px solid lightgrey",
                    marginRight: 3,
                  }}
                  onClick={handleBackBtnClick}
                >
                  Back
                </Button>
                <span
                  style={{ color: "rgba(149, 149, 149, 1)", fontSize: ".8rem" }}
                >
                  Cancel Montage
                </span>
              </span>
              <Button
                variant="contained"
                sx={{
                  ...buttonStyle,
                  boxShadow: "none",
                  justifySelf: "flex-end",
                }}
                color={
                  currentPageIndex === pages.length - 1 ? "success" : "primary"
                }
                onClick={handleNextBtnClick}
              >
                {currentPageIndex === pages.length - 1 ? "Save" : "Next"}
              </Button>
            </footer>
          )}
        </div>
      </ThemeProvider>
    </main>
  );
}

export default App;
