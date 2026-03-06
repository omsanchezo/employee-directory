import { useMemo, useState } from "react";
import { useGetEmployeesQuery, useGetDepartmentsQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";

export function EmployeesPage() {
  const { data: employees, isLoading, error, refetch } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return undefined;
    let result = employees;
    if (selectedDepartment !== "all") {
      result = result.filter((e) => e.department === selectedDepartment);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.firstName.toLowerCase().includes(term) ||
          e.lastName.toLowerCase().includes(term)
      );
    }
    return result;
  }, [employees, selectedDepartment, searchTerm]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Create Employee"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            New Employee
          </h2>
          <EmployeeCreateForm onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-12">
          <svg className="h-5 w-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-gray-500">Loading employees...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-red-800">
            Could not load employees. Check that the mock server is running on port 3001.
          </p>
          <button
            onClick={refetch}
            className="mt-3 min-h-[44px] rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {filteredEmployees && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div>
              <label htmlFor="search-name" className="mr-2 text-sm font-medium text-gray-700">
                Search:
              </label>
              <input
                id="search-name"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="department-filter" className="mr-2 text-sm font-medium text-gray-700">
                Department:
              </label>
              <select
                id="department-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All</option>
                {departments?.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {filteredEmployees.length === 0 ? (
            <p className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-500">
              No employees found.
            </p>
          ) : (
            <EmployeesTable employees={filteredEmployees} />
          )}
        </>
      )}
    </div>
  );
}
