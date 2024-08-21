import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceRequestSchema,
  ServiceRequestFormValues,
} from "@/validations/resident/serviceRequestSchema";

interface ServiceRequestFormProps {
  onSubmit: (data: ServiceRequestFormValues) => Promise<void>;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
  });

  const onSubmitHandler: SubmitHandler<ServiceRequestFormValues> = async (
    data
  ) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const renderErrorMessage = (fieldName: keyof ServiceRequestFormValues) => {
    if (errors[fieldName]) {
      return <p className="text-red-500">{errors[fieldName]?.message}</p>;
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">New Service Request</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            {...register("serviceType")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select a service</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="laundry">Laundry</option>
            <option value="other">Other</option>
          </select>
          {renderErrorMessage("serviceType")}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {renderErrorMessage("date")}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            {...register("time")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {renderErrorMessage("time")}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={3}
          ></textarea>
          {renderErrorMessage("description")}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default ServiceRequestForm;
