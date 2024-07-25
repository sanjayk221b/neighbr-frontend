import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddCaretakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  image: Yup.mixed().required("Profile image is required"),
});

const AddCaretakerModal: React.FC<AddCaretakerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out hover:scale-102">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Caretaker
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobileNumber: "",
            password: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const data = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (key === "image" && value instanceof File) {
                data.append(key, value);
              } else {
                data.append(key, value as string);
              }
            });

            onSubmit(data);
            onClose();
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
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
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files?.[0]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 transform hover:scale-105"
                >
                  Add Caretaker
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

export default AddCaretakerModal;
