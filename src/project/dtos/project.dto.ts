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

export const CreateProjectStruct = object({
  title: size(string(), 3, 100),
  tagline: size(string(), 3, 240),
  description: size(string(), 3, 2000),
  github: optional(string()),
  website: optional(string()),
  youtube: optional(string())
});

export const ReadProjectByUserIdStruct = object({
  userId: coerce(number(), string(), (value) => +value),
  page: defaulted(
    coerce(number(), string(), (value) => +value),
    1
  ),
  limit: defaulted(
    coerce(number(), string(), (value) => +value),
    10
  )
});

export type CreateProjectDto = Infer<typeof CreateProjectStruct>;
