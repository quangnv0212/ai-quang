import z from "zod";

export const AccountBody = z.object({
  id: z.any().optional(),
  userName: z.string().optional(),
  emailAddress: z.string().email().optional(),
  isActive: z.boolean().optional(),
  roleNames: z.any().optional(),
  password: z.string().optional(),
  lastLoginTime: z.any().optional(),
  creationTime: z.any().optional(),
  company: z.any().optional(),
  
});

export type AccountBodyType = z.TypeOf<typeof AccountBody>;
