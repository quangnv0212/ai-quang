import z from "zod";

export const UserBody = z.object({
  userName: z.string(),
  name: z.string(),
  surname: z.string(),
  emailAddress: z.string().email(),
  isActive: z.boolean(),
  roleNames: z.array(z.string()).optional(),
  password: z.string().optional(),
});

export type UserBodyType = z.TypeOf<typeof UserBody>;
