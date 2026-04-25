<<<<<<< HEAD
import React, { useState } from "react";

=======
import React from "react";
>>>>>>> a239abe (feat: Frontend Almost complete)
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";

<<<<<<< HEAD
export const CvForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    companyStartdate: "",
    companyEnddate: "",
    achievements: "",
    instituteName: "",
    degreeName: "",
    eduStartdate: "",
    eduEnddate: "",
    skills: "",
  });

  const handleCvForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCv = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/receive-cv",
        form,
      );
      console.log("Response", response.data);
    } catch (error) {
      console.log("Error in sending data", error);
    }
  };

=======
export const CvForm = ({ form, loading, onChange, onSubmit }) => {
  
>>>>>>> a239abe (feat: Frontend Almost complete)
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 0 }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
<<<<<<< HEAD
        <Stack spacing={4}>
          {/* Personal Information */}
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
                onChange={handleCvForm}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleCvForm}
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
                  onChange={handleCvForm}
                />
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  onChange={handleCvForm}
=======
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
>>>>>>> a239abe (feat: Frontend Almost complete)
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="companyStartdate"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={handleCvForm}
                  placeholder="Select Date"
                />
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="companyEnddate"
                  variant="outlined"
                  slotProps={{
                    InputLabelProps: { shrink: true },
                  }}
                  onChange={handleCvForm}
                />
              </Stack>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Achievements"
                name="achievements"
                onChange={handleCvForm}
              />
            </Stack>
          </Box>

<<<<<<< HEAD
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
                  onChange={handleCvForm}
                />
                <TextField
                  fullWidth
                  label="Degree"
                  name="degreeName"
                  onChange={handleCvForm}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="eduStartdate"
                  slotProps={{
                    InputLabelProps: { shrink: true },
                  }}
                  variant="outlined"
                  onChange={handleCvForm}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  variant="outlined"
                  name="eduEnddate"
                  value={form.eduEnddate}
                  slotProps={{
                    InputLabelProps: { shrink: true },
                  }}
                  onChange={handleCvForm}
                />
              </Stack>
              <Stack>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Skills
                </Typography>
=======
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

>>>>>>> a239abe (feat: Frontend Almost complete)
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
<<<<<<< HEAD
                  onChange={handleCvForm}
=======
                  value={form.skills}
                  onChange={onChange}
>>>>>>> a239abe (feat: Frontend Almost complete)
                />
              </Stack>
            </Stack>
          </Box>

<<<<<<< HEAD
          <Button
            variant="contained"
            size="large"
            onClick={createCv}
            sx={{ py: 1.5 }}
          >
            Create CV
          </Button>
        </Stack>
=======
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
>>>>>>> a239abe (feat: Frontend Almost complete)
      </Paper>
    </Box>

  );
};
