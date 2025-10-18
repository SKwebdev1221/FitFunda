import { Routes, Route } from 'react-router-dom';

// Doctor Pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientQueue from '../pages/doctor/PatientQueue';
import ShiftSchedule from '../pages/doctor/ShiftSchedule';
import DiseaseForecast from '../pages/doctor/DiseaseForecast';
import Communication from '../pages/doctor/Communication';
import MedicalRecords from '../pages/doctor/MedicalRecords';

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DoctorDashboard />} />
      <Route path="/patients" element={<PatientQueue />} />
      <Route path="/schedule" element={<ShiftSchedule />} />
      <Route path="/forecasts" element={<DiseaseForecast />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/records" element={<MedicalRecords />} />
    </Routes>
  );
};

export default DoctorRoutes;
