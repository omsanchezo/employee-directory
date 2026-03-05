import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeesPage } from "./features/employees/presentation/pages/EmployeesPage";
import { EmployeeDetailPage } from "./features/employee-detail/presentation/pages/EmployeeDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
