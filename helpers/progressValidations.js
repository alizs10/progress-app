import { z } from "zod";

export const progressSchema = z.object({
    _id: z.number(),
    title: z.string().min(1, 'title is required!'),
    theme: z.number().min(0).max(5),
    deadline: z.string().min(1, 'deadline should be a valid date').or(z.boolean()),
    steps: z.array(z.object({ _id: z.number(), title: z.string(), status: z.boolean() })).min(1, "steps min: 1").max(100, "steps limit: 100")
})