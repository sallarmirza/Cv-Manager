// metrics used: Technical Match,Quantified Results, Seniority Level, Cleanliness
import React from "react";
import { Paper, Box, Typography, Divider, LinearProgress } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts";

const SpeedoMeterGauge = ({ value }) => {
  return (
    <Box sx={{ width: 300, textAlign: "center" }}>
      <Gauge
        value={value}
        startAngle={-110}
        endAngle={110}
        innerRadius="80%"
        outerRadius="100%"
        height={200}
      />
      <Typography variant="h5" sx={{ mt: 1 }}>
        Overall Score: {value}%
      </Typography>
    </Box>
  );
};
const HorizontalBar = ({ label, value }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
};
export const ScoreCard = ({ data }) => {
  if (!data) return null;
    return (
    <Box sx={{ p: 2, maxWidth: 800 }}>
      <Paper sx={{ p: 3 }}>
        <SpeedoMeterGauge value={data.overall} />

        <Divider sx={{ my: 2 }} />

        <HorizontalBar label="Technical Match" value={data.technical} />
        <HorizontalBar label="Quantified Results" value={data.quantified} />
        <HorizontalBar label="Seniority Level" value={data.seniority} />
        <HorizontalBar label="Cleanliness" value={data.cleanliness} />
      </Paper>
    </Box>
  );
};

