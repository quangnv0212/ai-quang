import z from "zod";

export const ModelBody = z.object({
  name: z.string(),
});

export const UploadImageModelBody = z.object({
  ModelId: z.any(),
  Images: z.any(),
});

export type ModelBodyType = z.TypeOf<typeof ModelBody>;
export type UploadImageModelBodyType = z.TypeOf<typeof UploadImageModelBody>;
