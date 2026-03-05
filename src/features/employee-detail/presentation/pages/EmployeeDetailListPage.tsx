import { useGetEmployeeDetailsQuery } from "../../data/employee-detailApi";
import { EmployeeDetailTable } from "../components/EmployeeDetailTable";

export function EmployeeDetailListPage() {
  const { data: employees, isLoading, error } = useGetEmployeeDetailsQuery();

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>
      {employees && <EmployeeDetailTable employees={employees} />}
    </div>
  );
}
