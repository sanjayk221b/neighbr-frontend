import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Caretaker</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobileNumber: "",
            password: "",
            image: null as File | null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (key === "image" && value instanceof File) {
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
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Field as={Input} id="name" name="name" placeholder="Name" />
                  <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field as={Input} id="email" name="email" type="email" placeholder="Email" />
                  <ErrorMessage name="email" component="p" className="text-xs text-red-500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Field as={Input} id="mobileNumber" name="mobileNumber" placeholder="Mobile Number" />
                  <ErrorMessage name="mobileNumber" component="p" className="text-xs text-red-500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field as={Input} id="password" name="password" type="password" placeholder="Password" />
                  <ErrorMessage name="password" component="p" className="text-xs text-red-500" />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("image", event.currentTarget.files?.[0] || null);
                    }}
                  />
                  <ErrorMessage name="image" component="p" className="text-xs text-red-500" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Caretaker"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaretakerModal;