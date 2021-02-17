import {
  coerce,
  defaulted,
  Infer,
  number,
  object,
  optional,
  size,
  string
} from "superstruct";

export const CreateUserStruct = object({
  username: size(string(), 3, 12),
  password: string(),
  bio: size(string(), 1, 1000),
  github: string(),
  youtube: optional(string()),
  linkedin: optional(string()),
  twitter: optional(string())
});

export type CreateUserDto = Infer<typeof CreateUserStruct>;

export const ReadUserStruct = object({
  sortBy: defaulted(string(), "popular"),
  page: defaulted(
    coerce(number(), string(), (value) => +value),
    1
  ),
  limit: defaulted(
    coerce(number(), string(), (value) => +value),
    10
  )
});

export type ReadUserDto = Infer<typeof ReadUserStruct>;
