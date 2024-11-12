import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, { message: "Please add name with at least 4 characters" }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long ",
  }),
});
