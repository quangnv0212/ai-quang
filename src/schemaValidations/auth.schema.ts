import z from "zod";

export const RegisterBody = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6).max(100),
    companyName: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    state: z.string().min(1).max(100).optional(),
    postCode: z.any().optional(),
    suburb: z.string().optional(),
    firstAddress: z.string(),
    secondAddress: z.string().optional(),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
export const ChangePasswordBody = z
  .object({
    currentPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ currentPassword, newPassword, confirmNewPassword }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from the current password",
        path: ["newPassword"],
      });
    }
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });
export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const LoginRes = z.object({
  data: z.object({
    results: z.object({
      accessToken: z.string(),
      encryptedAccessToken: z.string(),
      expireInSeconds: z.number(),
      userId: z.number(),
    }),
    targetUrl: z.any(),
    success: z.boolean(),
    error: z.any(),
    unAuthorizedRequest: z.boolean(),
    __abp: z.boolean(),
  }),
});

export type RegisterResType = z.TypeOf<typeof LoginRes>;

export const LoginBody = z
  .object({
    userNameOrEmailAddress: z.string(),
    password: z.string().min(6).max(100),
    tenancyName: z.string().optional(),
    rememberClient: z.boolean().optional(),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = LoginRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
