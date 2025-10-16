import { Routes, Route } from 'react-router-dom';

// Inventory Pages
import InventoryDashboard from '../pages/inventory/InventoryDashboard';
import StockStatus from '../pages/inventory/StockStatus';
import SupplyOrders from '../pages/inventory/SupplyOrders';
import ForecastedNeeds from '../pages/inventory/ForecastedNeeds';
import SupplierContacts from '../pages/inventory/SupplierContacts';
import Reports from '../pages/inventory/Reports';

const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryDashboard />} />
      <Route path="/stock" element={<StockStatus />} />
      <Route path="/orders" element={<SupplyOrders />} />
      <Route path="/forecasts" element={<ForecastedNeeds />} />
      <Route path="/suppliers" element={<SupplierContacts />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default InventoryRoutes;
