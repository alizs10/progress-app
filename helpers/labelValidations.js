import { z } from "zod";

export const labelSchema = z.object({
    _id: z.number(),
    name: z.string().min(1, 'label name is required!').max(12, 'label name: max char is 12'),
})