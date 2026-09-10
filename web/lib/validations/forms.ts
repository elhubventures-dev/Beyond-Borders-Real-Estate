import { z } from "zod";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

const serviceValues = [...site.services] as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  service: z.enum(serviceValues),
  message: z.string().min(5, "Please add a short comment").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const inspectionProjects = projects.map((p) => p.inspectionLabel) as [
  string,
  ...string[],
];

export const inspectionSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  project: z.enum(inspectionProjects),
  date: z.string().min(1, "Choose a preferred date"),
  time: z.string().min(1, "Choose a preferred time"),
});

export type InspectionFormData = z.infer<typeof inspectionSchema>;
