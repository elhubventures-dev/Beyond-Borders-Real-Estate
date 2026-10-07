import { z } from "zod";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { inspectionScheduleIssue } from "@/lib/inspection-slot";

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

export const inspectionSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(7, "Enter a valid phone number"),
    project: z.enum(inspectionProjects),
    date: z.string().min(1, "Choose a preferred date"),
    time: z.string().min(1, "Choose a preferred time"),
  })
  .superRefine((value, ctx) => {
    const issue = inspectionScheduleIssue(value.date, value.time);
    if (!issue) return;
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: [issue.path], message: issue.message });
  });

export type InspectionFormData = z.infer<typeof inspectionSchema>;

export const downloadLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter your phone number")
    .refine((value) => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number"),
  document: z.string().trim().min(2).max(80),
  href: z
    .string()
    .trim()
    .max(200)
    .refine((value) => value.startsWith("/media/") && !value.includes(".."), "Invalid document")
    .optional(),
});

export type DownloadLeadData = z.infer<typeof downloadLeadSchema>;
