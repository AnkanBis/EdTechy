import z from "zod";

export const signupInput = z.object({
  role: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});


export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
