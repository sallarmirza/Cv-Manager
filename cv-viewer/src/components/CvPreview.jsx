import React from "react";
import { Paper, Typography,Divider,Box } from "@mui/material";
import { useEffect } from "react";

export const CvPreview = ({ result }) => {
  console.log("CvPreview received data:", result);
  useEffect(() => {
    
    console.log("✅ CvPreview Mounted");

    return () => console.log("❌ CvPreview Unmounted");
  }, []);
  if (!result) return(<Typography>Complete the form </Typography>);
  return (
    <div>
      <Box sx={{ px: 3 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, minHeight: "500px", backgroundColor: "#fff" }}
        >
          <Typography variant="h4">{result.name}</Typography>
          <Typography variant="h6">{result.jobTitle}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography>
            {result.company}-{result.duration}
          </Typography>
          <Typography>{result.achievements}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Education
          </Typography>
          <Typography variant="subtitle1">
            {result.education.degree} — {result.education.institute}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result.education.duration}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Skills
          </Typography>
          <Typography variant="body1">{result.skills}</Typography>
        </Paper>
      </Box>
    </div>
  );
};
