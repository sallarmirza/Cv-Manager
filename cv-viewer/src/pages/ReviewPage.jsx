import React from "react";
import { ScoreCard } from "../components/ScoreCard";
import { UploadBox } from "../components/UploadBox";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ReviewPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        ← Go Back
      </Button>

      {/* Title */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI CV Reviewer
      </Typography>

      {/* Layout */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <UploadBox />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <ScoreCard />
        </Grid>
      </Grid>
    </Box>
  );
};