import { z } from "zod";

export const SelectOptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
});
