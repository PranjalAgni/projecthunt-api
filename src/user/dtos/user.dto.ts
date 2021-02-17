import { Infer, object, optional, size, string } from "superstruct";

export const CreateUserStruct = object({
  username: string(),
  password: string(),
  bio: size(string(), 1, 1000),
  github: string(),
  youtube: optional(string()),
  linkedin: optional(string()),
  twitter: optional(string())
});

export type CreateUserDto = Infer<typeof CreateUserStruct>;
