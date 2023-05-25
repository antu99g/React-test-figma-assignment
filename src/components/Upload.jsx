import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function Upload() {
  return (
    <Box
      sx={{
        height: "50vh",
        width: "85%",
        backgroundColor: "white",
        padding: "2vw",
        borderRadius: "5px",
      }}
    >
      <Card
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(248, 248, 248, 1)",
          border: "1px dashed rgba(138, 138, 138, 1)",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image="/upload-icon.svg"
            alt="upload"
            sx={{ width: 50 }}
          />
          <CardActions>
            <Button variant="outlined" size="small">
              Browse Files
            </Button>
          </CardActions>
          <CardContent sx={{ padding: "0", fontSize: ".8rem" }}>
            or drop files here
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
