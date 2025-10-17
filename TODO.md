# TODO: Implement Public Advisory Page and Update Navbars

- [x] Update src/config.js to add PUBLIC_ADVISORY route constant
- [x] Create src/pages/PublicAdvisory.jsx with engaging health advisory content
- [x] Update src/routes/AppRoutes.jsx to add protected route for /public-advisory accessible to all roles
- [x] Update src/components/common/Navbar.jsx to be role-aware, show Dashboard, Public Advisory, Logout for authenticated users, and highlight active link
- [x] Add Navbar to all dashboard pages (ManagementDashboard, NurseDashboard, InventoryDashboard, EmergencyDashboard, PatientPortal)
- [x] Replace role-specific navbars with common Navbar in DoctorDashboard, NurseDashboard, EmergencyDashboard
