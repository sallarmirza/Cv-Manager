import React from "react";
import {

  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CvForm } from "../components/CvForm";
export const Home = () => {
  const DrawerList = (
    <Box sx={{ width: 240,height:'100vh',borderRight:'1px solid black'}} role="presentation">
      <List>
        <ListItemButton>
          <ListItemText primary="CV Reviwer" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="CV Builder" />
        </ListItemButton>
      </List>
    </Box>
  );
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
};
