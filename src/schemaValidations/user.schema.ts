import z from "zod";

export const UserBody = z.object({
  id: z.any().optional(),
  userName: z.string(),
  name: z.string(),
  surname: z.string(),
  emailAddress: z.string().email(),
  isActive: z.boolean(),
  roleNames: z.array(z.string()).optional(),
  password: z.string(),
  fullName: z.string().optional(),
  lastLoginTime: z.any().optional(),
  creationTime: z.any().optional(),
});

export type UserBodyType = z.TypeOf<typeof UserBody>;
