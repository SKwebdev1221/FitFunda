import { Routes, Route } from 'react-router-dom';

// Patient Pages
import PatientPortal from '../pages/patient/PatientPortal';
import HealthAdvisory from '../pages/patient/HealthAdvisory';
import AppointmentBooking from '../pages/patient/AppointmentBooking';
import MyReports from '../pages/patient/MyReports';
import HospitalLocator from '../pages/patient/HospitalLocator';

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientPortal />} />
      <Route path="/advisory" element={<HealthAdvisory />} />
      <Route path="/appointments" element={<AppointmentBooking />} />
      <Route path="/reports" element={<MyReports />} />
      <Route path="/locator" element={<HospitalLocator />} />
    </Routes>
  );
};

export default PatientRoutes;
