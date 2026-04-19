import React from "react";
import { Box, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CvForm } from "../components/CvForm";

export const Home = () => {
  const DrawerList = (
    <Box sx={{ height: "100vh", borderRight: "1px solid #ddd" }}>
      <List>
        <ListItemButton>
          <ListItemText primary="CV Reviewer" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="CV Builder" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Grid container>

      <Grid  sx={2}>
        {DrawerList}
      </Grid>

      <Grid  sx={7} sx={{ p: 3 }}>
        <CvForm />
      </Grid>

      <Grid  sx={3} sx={{ borderLeft: "1px solid #ddd", p: 2 }}>
        <Typography variant="h6">Review</Typography>
      </Grid>
    </Grid>
  );
};