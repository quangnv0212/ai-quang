import z from "zod";
const x = {
  lastName: "Vu2",
  firstName: "Quan2g",
  emailAddress: "user1@example.com",
  password: "123123",
  companyName: "Nobisofht",
  country: "Vietnam",
  state: "hanoi",
  postCode: "post",
  suburb: "string1",
  firstAddress: "strging",
  secondAddress: "strigng",
  captchaResponse: "strging",
};
export const RegisterBody = z
  .object({
    lastName: z.string().min(1).max(50),
    firstName: z.string().min(1).max(50),
    emailAddress: z.string().email(),
    password: z.string().min(6).max(100),
    companyName: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    postCode: z.any(),
    suburb: z.string(),
    firstAddress: z.string(),
    secondAddress: z.string(),
    captchaResponse: z.string(),
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

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
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

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    userNameOrEmailAddress: z.string().email(),
    password: z.string().min(6).max(100),
    rememberClient: z.boolean(),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
