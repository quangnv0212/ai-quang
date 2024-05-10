import z from "zod";

export const TenantBody = z.object({
    tenancyName: z.string().optional(),
    companyName: z.string().optional(),
    isActive: z.boolean().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    postCode: z.string().optional(),
    suburb: z.string().optional(),
    firstAddress: z.string().optional(),
    secondAddress: z.string().optional(),
    emailAddress: z.any().optional(),
    password: z.any().optional(),
    id: z.number().optional(),
});

export type TenantBodyType = z.TypeOf<typeof TenantBody>;
