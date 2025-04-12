import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Grid, Stack
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScheduleIcon from '@mui/icons-material/Schedule';
import apiRequest from "../../api/api";

const DoctorHomeDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayPatients: 0,
    todayAppointments: 0,
  });
  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });


  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patients = await apiRequest({ endpoint: "/api/patient/allPatient" });
  
        const today = new Date().toDateString();
        const todayPatients = patients.filter(p => new Date(p.createdAt).toDateString() === today).length;
  
        const todayAppointments = patients.filter(p => 
          p.appointmentDate && new Date(p.appointmentDate).toDateString() === today
        ).length;
  
        setStats({
          totalPatients: patients.length,
          todayPatients,
          todayAppointments,
        });
      } catch (err) {
        console.error("Failed to load patient data", err);
      }
    };
  
    fetchPatientData();
  }, []);
  

  const StatCard = ({ icon, label, value, date }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        textAlign: "center",
        backgroundColor: "#f0f4ff",
        color: "#0D47A1",
        minHeight: 180
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Box sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "2px solid #0D47A1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {icon}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<PersonIcon fontSize="large" />}
            label="Total Patient"
            value={`${stats.totalPatients}+`}
            date="Till Today"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<LocalHospitalIcon fontSize="large" />}
            label="Today Patient"
            value={String(stats.todayPatients).padStart(3, '0')}
            date={todayDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<ScheduleIcon fontSize="large" />}
            label="Today Appointments"
            value={String(stats.todayAppointments).padStart(3, '0')}
            date={todayDate}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorHomeDashboard;
