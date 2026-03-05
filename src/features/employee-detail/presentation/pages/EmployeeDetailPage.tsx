import { useParams, Link } from "react-router-dom";
import {
  useGetEmployeeDetailByIdQuery,
  useUpdateEmployeeDetailMutation,
} from "../../data/employee-detailApi";
import { useGetDepartmentsQuery } from "../../../employees/data/employeesApi";
import { EmployeeDetailForm } from "../components/EmployeeDetailForm";

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  const {
    data: employee,
    isLoading,
    error,
  } = useGetEmployeeDetailByIdQuery(employeeId, { skip: isNaN(employeeId) });
  const { data: departments } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading employee details...</p>;
  }

  if (error || !employee) {
    return <p className="p-6 text-red-600">Failed to load employee details.</p>;
  }

  const departmentNames = departments?.map((d) => d.name) ?? [];

  const handleSubmit = async (data: Omit<typeof employee, "id">) => {
    await updateEmployee({ id: employee.id, ...data });
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        to="/"
        className="mb-4 inline-block text-sm text-blue-600 hover:text-blue-800"
      >
        &larr; Back to employees
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {employee.firstName} {employee.lastName}
      </h1>
      <EmployeeDetailForm
        defaultValues={employee}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        departments={departmentNames}
      />
    </div>
  );
}
