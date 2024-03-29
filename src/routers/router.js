import { Routes, Route, Navigate } from 'react-router-dom';
import { AddCliente,  Consulta,    Dashboard,  EditClient,  Login,  } from '../pages';
import PrivateRouter from './PrivateRouter';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Rotas admin */}
      <Route path="/dashboard" element={<PrivateRouter> <Dashboard /></PrivateRouter>} />
      <Route path="/addcliente" element={<PrivateRouter> <AddCliente /></PrivateRouter>} />
      <Route path="/consultacliente" element={<PrivateRouter> <Consulta /></PrivateRouter>} />
      <Route path="/editcliente/:id" element={<PrivateRouter> <EditClient /></PrivateRouter>} />
    </Routes>
  );
}