import { Routes, Route } from 'react-router-dom';

// Nurse Pages
import NurseDashboard from '../pages/nurse/NurseDashboard';
import PatientCareTasks from '../pages/nurse/PatientCareTasks';
import ShiftSchedule from '../pages/nurse/ShiftSchedule';
import WardStatus from '../pages/nurse/WardStatus';

const NurseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboard />} />
      <Route path="/tasks" element={<PatientCareTasks />} />
      <Route path="/schedule" element={<ShiftSchedule />} />
      <Route path="/ward" element={<WardStatus />} />
    </Routes>
  );
};

export default NurseRoutes;
