<<<<<<< HEAD
import React from "react";
import {
=======
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
>>>>>>> a239abe (feat: Frontend Almost complete)

  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CvForm } from "../components/CvForm";
export const Home = () => {
  const [tab, setTab] = useState("reviewer");
  const navigate = useNavigate();

  const changeTab = () => {
    setTab(true);
  };
  const DrawerList = (
    <Box sx={{ width: 240,height:'100vh',borderRight:'1px solid black'}} role="presentation">
      <List>
<<<<<<< HEAD
        <ListItemButton>
          <ListItemText primary="CV Reviwer" />
        </ListItemButton>
        <ListItemButton>
=======
        <ListItemButton onClick={() => navigate("/builder")}>
>>>>>>> a239abe (feat: Frontend Almost complete)
          <ListItemText primary="CV Builder" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/review")}>
          <ListItemText primary="CV Reviewer" />
        </ListItemButton>
      </List>
    </Box>
  );
<<<<<<< HEAD
  // fragments
  return <>
<Box sx={{display:'flex'}}>
  <Box component="nav">
    {DrawerList}
  </Box>
<Box component="main" sx={{flexGrow:1,p:3,ml:'240px',minHeight:'100vh'}}>
<CvForm/>
</Box>
</Box>
  </>;
=======

  return (
    <Grid container>
      <Grid size={2}>{DrawerList}</Grid>

      <Grid size={10}>
        <BuilderPage />
      </Grid>
    </Grid>
  );
>>>>>>> a239abe (feat: Frontend Almost complete)
};
