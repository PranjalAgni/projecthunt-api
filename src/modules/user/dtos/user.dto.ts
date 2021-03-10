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

export const ReadUserByIdStruct = object({
  userId: coerce(number(), string(), (value) => +value)
});

export const CreateGithubUser = object({
  id: string(),
  accessToken: string(),
  refreshToken: string(),
  username: string(),
  _json: object()
});

export type CreateUserDto = Infer<typeof CreateUserStruct>;
export type ReadUserDto = Infer<typeof ReadUserStruct>;
export type ReadUserByIdDto = Infer<typeof ReadUserByIdStruct>;
export type CreateGithubUserDto = Infer<typeof CreateGithubUser>;
