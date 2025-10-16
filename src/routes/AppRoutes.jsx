import { Routes, Route } from 'react-router-dom';
import { CONFIG } from '../config';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';

// Role-based Route Components
import ManagementRoutes from './ManagementRoutes';
import DoctorRoutes from './DoctorRoutes';
import NurseRoutes from './NurseRoutes';
import InventoryRoutes from './InventoryRoutes';
import EmergencyRoutes from './EmergencyRoutes';
import PatientRoutes from './PatientRoutes';

// Components
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={CONFIG.ROUTES.HOME} element={<Home />} />
      <Route path={CONFIG.ROUTES.ABOUT} element={<About />} />
      <Route path={CONFIG.ROUTES.LOGIN} element={<Login />} />
      <Route path={CONFIG.ROUTES.SIGNUP} element={<Signup />} />
      <Route path={CONFIG.ROUTES.CONTACT} element={<Contact />} />

      {/* Protected Role-based Routes */}
      <Route
        path={`${CONFIG.ROUTES.MANAGEMENT}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.MANAGEMENT]}>
            <ManagementRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${CONFIG.ROUTES.DOCTOR}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.DOCTOR]}>
            <DoctorRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${CONFIG.ROUTES.NURSE}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.NURSE]}>
            <NurseRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${CONFIG.ROUTES.INVENTORY}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.INVENTORY]}>
            <InventoryRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${CONFIG.ROUTES.EMERGENCY}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.EMERGENCY]}>
            <EmergencyRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${CONFIG.ROUTES.PATIENT}/*`}
        element={
          <ProtectedRoute allowedRoles={[CONFIG.ROLES.PATIENT]}>
            <PatientRoutes />
          </ProtectedRoute>
        }
      />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
