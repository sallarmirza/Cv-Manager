import React from "react";
import { useCvBuilder } from "../hooks/UseCvBuilder";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

export const CvForm = () => {
  const { form, loading, handleChange, result, handleSubmit } = useCvBuilder();

  return (
    <Box sx={{ p: 2, maxWidth: 800 }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="companyStartDate"
                    value={form.companyStartDate}
                    onChange={handleChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="companyEndDate"
                    value={form.companyEndDate}
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Degree"
                    name="degreeName"
                    value={form.degreeName}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="eduStartDate"
                    value={form.eduStartDate}
                    onChange={handleChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="eduEndDate"
                    value={form.eduEndDate}
                    onChange={handleChange}
                    slotProps={{ InputLabelProps: { shrink: true } }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                />
              </Stack>
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.5 }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create CV"}
            </Button>

            {result && (
              <Typography color="success.main">
                CV Created Successfully ✅
              </Typography>
            )}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};