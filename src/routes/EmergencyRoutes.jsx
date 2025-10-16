import { Routes, Route } from 'react-router-dom';

// Emergency Pages
import EmergencyDashboard from '../pages/emergency/EmergencyDashboard';
import SurgeAlert from '../pages/emergency/SurgeAlert';
import AmbulanceTracking from '../pages/emergency/AmbulanceTracking';
import ResponseProtocol from '../pages/emergency/ResponseProtocol';
import InterHospitalCoordination from '../pages/emergency/InterHospitalCoordination';

const EmergencyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmergencyDashboard />} />
      <Route path="/alerts" element={<SurgeAlert />} />
      <Route path="/ambulance" element={<AmbulanceTracking />} />
      <Route path="/protocol" element={<ResponseProtocol />} />
      <Route path="/coordination" element={<InterHospitalCoordination />} />
    </Routes>
  );
};

export default EmergencyRoutes;
