import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

interface AddResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  apartmentNumber: Yup.string().required("Apartment number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  hasVehicle: Yup.boolean(),
  vehicles: Yup.array().of(Yup.string()),
});

const AddResidentModal: React.FC<AddResidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out hover:scale-102">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Resident
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobileNumber: "",
            apartmentNumber: "",
            password: "",
            hasVehicle: false,
            vehicles: [""],
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (key === "vehicles") {
                (value as string[]).forEach((vehicle) =>
                  formData.append("vehicles", vehicle)
                );
              } else if (key === "image" && value instanceof File) {
                formData.append(key, value);
              } else {
                formData.append(key, value as string);
              }
            });
            onSubmit(formData);
            onClose();
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6" encType="multipart/form-data">
              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="mobileNumber"
                >
                  Mobile Number
                </label>
                <Field
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="apartmentNumber"
                >
                  Apartment Number
                </label>
                <Field
                  type="text"
                  name="apartmentNumber"
                  id="apartmentNumber"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="apartmentNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Field
                  type="checkbox"
                  name="hasVehicle"
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="text-gray-700 text-sm font-semibold">
                  Has Vehicle
                </span>
              </div>

              {values.hasVehicle && (
                <FieldArray name="vehicles">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Vehicle Numbers
                      </label>
                      {values.vehicles.map((_, index) => (
                        <div key={index} className="flex space-x-2">
                          <Field
                            name={`vehicles.${index}`}
                            type="text"
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Vehicle number"
                          />
                          {index === values.vehicles.length - 1 && (
                            <button
                              type="button"
                              onClick={() => push("")}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                              +
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              )}

              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="image"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files?.[0]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  accept="image/*"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 transform hover:scale-105"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddResidentModal;
