import { z } from "zod";

export const SelectOptionSchema = z.object({
  id: z.number(),
  name: z.string(),
});
