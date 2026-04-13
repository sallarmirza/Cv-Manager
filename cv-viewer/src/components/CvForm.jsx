import React, { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
export const CvForm = () => {
    const [form,setForm]=useState({
        firstName:'',lastName:'',jobTitle:"",
        experience:"",skills:""
    })
    const handleForm=(e)=>{
        setForm({...form,[e.target.firstName]:e.target.value,[e.target.lastName]:e.target.value,[e.target.jobTitle]:e.target.value,[e.target.skills]:e.target.value,[e.target.experience]:e.target.value})
    }
    const createCv=()=>{
        console.log('CV data',form)
    }
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography>Professional Details</Typography>
        <Paper variant="outlined" sx={{ p: 4, mt: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ p:2,maxWidth:800,mx:'auto' }}>
              <TextField fullWidth label="First Name" variant="outlined" name="firstName" onChange={handleForm} />
              <TextField fullWidth label="Last Name" variant="outlined" name="lastName" onChange={handleForm} />
            </Box>
            <TextField
              fullWidth
              label="Job Title"
              placeholder="e.g Full Stack Developer" name="jobTitle" onChange={handleForm}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Work Experience"
              placeholder="Enter your Experience here"
              name="experience" onChange={handleForm}
            />
            <TextField fullWidth label="Skills" placeholder="React,Python..." name="skills" onChange={handleForm}/>
            <Button variant="contained" size="large" onClick={createCv}>Create Cv</Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
