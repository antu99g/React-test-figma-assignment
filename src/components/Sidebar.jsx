/* eslint-disable react/prop-types */
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GridViewRounded, NoteAddRounded, Paid } from "@mui/icons-material";

// Styles for active section
const activeSectionStyles = {
  backgroundColor: "rgba(44, 169, 227, 0.25)",
  borderLeft: "5px solid rgba(44, 169, 227, 1)",
};

// Styles for non-active sections
const listIconStyles = {
  textAlign: "right",
  marginLeft: -3.5,
  marginRight: 1.5,
};

// Styles for active sections
const activeIconStyles = {
  textAlign: "right",
  marginLeft: -4,
  marginRight: 1.5,
};

export default function Sidebar({ currentSection }) {
  return (
    <nav>
      <h1>React Test</h1>

      <Divider
        variant="middle"
        sx={{
          bgcolor: "rgba(79, 79, 79, 1)",
          height: "1.5px",
          borderRadius: 5,
        }}
      />

      <List component="ul" sx={{ fontSize: ".6rem" }}>
        <ListItem
          sx={currentSection === "dashboard" ? activeSectionStyles : {}}
        >
          <ListItemAvatar
            sx={
              currentSection === "dashboard" ? activeIconStyles : listIconStyles
            }
          >
            <GridViewRounded />
          </ListItemAvatar>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem sx={currentSection === "montages" ? activeSectionStyles : {}}>
          <ListItemAvatar
            sx={
              currentSection === "montages" ? activeIconStyles : listIconStyles
            }
          >
            <NoteAddRounded />
          </ListItemAvatar>
          <ListItemText primary="Montages" />
        </ListItem>

        <ListItem sx={currentSection === "credits" ? activeSectionStyles : {}}>
          <ListItemAvatar
            sx={
              currentSection === "credits" ? activeIconStyles : listIconStyles
            }
          >
            <Paid />
          </ListItemAvatar>
          <ListItemText primary="Credits" />
        </ListItem>
      </List>

      <Container
        sx={{
          backgroundColor: "rgba(2, 53, 79, 1)",
          width: "80%",
          padding: "2.5vw 0 !important",
          marginTop: "40vh",
        }}
      >
        <h1 className="creditHeader">1,650</h1>
        <small>Total Credits Available</small>
      </Container>
    </nav>
  );
}
