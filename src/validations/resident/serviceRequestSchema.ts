import { z } from "zod";

export const serviceRequestSchema = z.object({
  serviceType: z.string().nonempty({ message: "Service type is required" }),
  date: z
    .string()
    .nonempty({ message: "Date is required" })
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      { message: "Date must be a valid future date" }
    ),
  time: z
    .string()
    .nonempty({ message: "Time is required" })
    .refine(
      (value) => {
        const time = new Date(`1970-01-01T${value}:00`);
        return !isNaN(time.getTime());
      },
      { message: "Time must be a valid time" }
    ),
  description: z.string().nonempty({ message: "Description is required" }),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;
