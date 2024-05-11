import { Routes, Route, Navigate } from "react-router-dom";
import {
  AddQuery,
  Dashboard,
  DashboardDouctor,
  Doctor,
  Login,
  Patient,
  TableQuery,
} from "../pages";
import PrivateRouter from "./PrivateRouter";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Rotas admin */}
      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            {" "}
            <Dashboard />
          </PrivateRouter>
        }
      />
      <Route
        path="/dashboard/medico"
        element={
          <PrivateRouter>
            {" "}
            <DashboardDouctor />
          </PrivateRouter>
        }
      />

      <Route
        path="/adicionar/medicos"
        element={
          <PrivateRouter>
            {" "}
            <Doctor />
          </PrivateRouter>
        }
      />
      <Route
        path="/nova/consulta"
        element={
          <PrivateRouter>
            {" "}
            <AddQuery />
          </PrivateRouter>
        }
      />
      <Route
        path="/tabela/consulta"
        element={
          <PrivateRouter>
            {" "}
            <TableQuery />
          </PrivateRouter>
        }
      />

      <Route
        path="/adicionar/paciente"
        element={
          <PrivateRouter>
            {" "}
            <Patient />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
