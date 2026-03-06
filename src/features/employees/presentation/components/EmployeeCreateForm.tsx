import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddEmployeeMutation,
  useGetDepartmentsQuery,
} from "../../data/employeesApi";
import { employeeSchema, type EmployeeFormData } from "../../domain/employee.schema";

export function EmployeeCreateForm({ onSuccess, onCancel }: { onSuccess?: () => void; onCancel?: () => void }) {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const { data: departments = [] } = useGetDepartmentsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      department: "",
      startDate: "",
      status: "active",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await addEmployee(data).unwrap();
      reset();
      onSuccess?.();
    } catch {
      // Error is captured in the hook's error state
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const errorClass = "mt-1 text-xs text-red-600";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input id="firstName" {...register("firstName")} className={inputClass} />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input id="lastName" {...register("lastName")} className={inputClass} />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" type="email" {...register("email")} className={inputClass} />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="position" className={labelClass}>Position</label>
        <input id="position" {...register("position")} className={inputClass} />
        {errors.position && (
          <p className={errorClass}>{errors.position.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="department" className={labelClass}>Department</label>
          <select id="department" {...register("department")} className={inputClass}>
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className={errorClass}>{errors.department.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>Status</label>
          <select id="status" {...register("status")} className={inputClass}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className={errorClass}>{errors.status.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="startDate" className={labelClass}>Start Date</label>
        <input id="startDate" type="date" {...register("startDate")} className={inputClass} />
        {errors.startDate && (
          <p className={errorClass}>{errors.startDate.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Save Employee"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[44px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
