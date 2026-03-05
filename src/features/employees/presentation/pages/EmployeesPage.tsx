import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";

export function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Create Employee"}
        </button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            New Employee
          </h2>
          <EmployeeCreateForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      {employees && <EmployeesTable employees={employees} />}
    </div>
  );
}
