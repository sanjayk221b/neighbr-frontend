import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  mobileNumber: Yup.string().required("Required"),
  apartmentNumber: Yup.string().required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
  hasVehicle: Yup.boolean(),
  vehicles: Yup.array().of(Yup.string()),
});

const AddResidentModal: React.FC<AddResidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resident</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobileNumber: "",
            apartmentNumber: "",
            password: "",
            hasVehicle: false,
            vehicles: [],
            image: null as File | null,
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
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Field as={Input} id="name" name="name" placeholder="Name" />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Field
                    as={Input}
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="apartmentNumber">Apartment Number</Label>
                  <Field
                    as={Input}
                    id="apartmentNumber"
                    name="apartmentNumber"
                    placeholder="Apartment Number"
                  />
                  <ErrorMessage
                    name="apartmentNumber"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        "image",
                        event.currentTarget.files?.[0] || null
                      );
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Field
                  type="checkbox"
                  name="hasVehicle"
                  id="hasVehicle"
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor="hasVehicle"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Has Vehicle
                </label>
              </div>

              {values.hasVehicle && (
                <FieldArray name="vehicles">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      <Label className="pr-8">Vehicle Numbers</Label>
                      {values.vehicles.map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Field
                            as={Input}
                            name={`vehicles.${index}`}
                            placeholder="Vehicle number"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => push("")}
                      >
                        Add Vehicle
                      </Button>
                    </div>
                  )}
                </FieldArray>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add User"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddResidentModal;
