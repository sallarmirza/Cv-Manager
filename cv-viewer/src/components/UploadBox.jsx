import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export const UploadBox = ({ handleFileUpload, loading, reset, checkFile }) => {
  return (
    <Card sx={{ width: 500, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Upload CV
        </Typography>

        <Paper
          component="label"
          variant="outlined"
          sx={{
            p: 4,
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "primary.main",
            textAlign: "center",
            cursor: "pointer",
            display: "block",
            bgcolor: "action.hover",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "action.selected",
              borderColor: "primary.dark",
            },
          }}
        >
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={loading}
          />

          {loading && <CircularProgress />}

          <CloudUploadIcon
            sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
          />

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Click to select or drag and drop
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PDF, DOCX (max. 5MB)
            </Typography>
          </Box>
        </Paper>
        {checkFile && (
          <Button sx={{ mt: 2 }} variant="contained" onClick={reset}>
            Upload New CV
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
