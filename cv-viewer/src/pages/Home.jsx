import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BuilderPage } from "./BuilderPage";

export const Home = () => {
  const [tab, setTab] = useState("reviewer");
  const navigate = useNavigate();

  const changeTab = () => {
    setTab(true);
  };
  const DrawerList = (
    <Box sx={{ height: "100vh", borderRight: "1px solid #ddd" }}>
      <List>
        <ListItemButton onClick={() => navigate("/builder")}>
          <ListItemText primary="CV Builder" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/review")}>
          <ListItemText primary="CV Reviewer" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Grid container>
      <Grid size={2}>{DrawerList}</Grid>

      <Grid size={10}>
        <BuilderPage />
      </Grid>
    </Grid>
  );
};
