import { SelectOptionSchema } from "@/schemas/option";
import { z } from "zod";

export type SelectOption = z.infer<typeof SelectOptionSchema>;
