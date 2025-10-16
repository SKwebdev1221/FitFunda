import { Routes, Route } from 'react-router-dom';

// Management Pages
import ManagementDashboard from '../pages/management/ManagementDashboard';
import BedManagement from '../pages/management/BedManagement';
import StaffAllocation from '../pages/management/StaffAllocation';
import ReadinessReports from '../pages/management/ReadinessReports';
import Analytics from '../pages/management/Analytics';

const ManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagementDashboard />} />
      <Route path="/beds" element={<BedManagement />} />
      <Route path="/staff" element={<StaffAllocation />} />
      <Route path="/reports" element={<ReadinessReports />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default ManagementRoutes;
