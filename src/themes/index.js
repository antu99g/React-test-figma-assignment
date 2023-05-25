import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          fontSize: ".75rem",
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: ".8rem",
          paddingTop: "1px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: ".9rem",
          backgroundColor: "white",
          outlineColor: "rgba(234, 234, 234, 1)",
        },
      },
    },
  },
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "rgba(47, 126, 199, 1)",
    },
    success: {
      main: "rgba(16, 164, 75, 1)",
    },
  },
});

export default theme;
