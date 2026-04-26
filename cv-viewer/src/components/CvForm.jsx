import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

export const CvForm = ({ form, loading, onChange, onSubmit }) => {
  
  return (
    <Box sx={{ p: 2, maxWidth: 800 }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            {/* Personal Info */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Personal Information
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                />
              </Stack>
            </Box>

            {/* Work Experience */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Work Experience
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={onChange}
                  />
                  <TextField
                    fullWidth
                    label="Company"
                    name="companyName"
                    value={form.companyName || ""}
                    onChange={onChange}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="companyStartDate"
                    value={form.companyStartDate}
                    onChange={onChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="companyEndDate"
                    value={form.companyEndDate}
                    onChange={onChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Achievements"
                  name="achievements"
                  value={form.achievements}
                  onChange={onChange}
                />
              </Stack>
            </Box>

            {/* Education */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Education
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label="Institute"
                    name="instituteName"
                    value={form.instituteName}
                    onChange={onChange}
                  />
                  <TextField
                    fullWidth
                    label="Degree"
                    name="degreeName"
                    value={form.degreeName}
                    onChange={onChange}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="eduStartDate"
                    value={form.eduStartDate}
                    onChange={onChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="eduEndDate"
                    value={form.eduEndDate}
                    onChange={onChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={form.skills}
                  onChange={onChange}
                />
              </Stack>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.5 }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create CV"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
