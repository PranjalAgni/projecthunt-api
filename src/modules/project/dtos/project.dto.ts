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

export const ReadProjectStruct = object({
  sortBy: defaulted(string(), "popular"),
  name: optional(string()),
  tag: optional(string()),
  page: defaulted(
    coerce(number(), string(), (value) => +value),
    1
  ),
  limit: defaulted(
    coerce(number(), string(), (value) => +value),
    10
  )
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

export const CreateCommentStruct = object({
  title: size(string(), 3, 50),
  body: size(string(), 3, 1000),
  projectId: coerce(number(), string(), (val) => +val)
});

export const ReadProjectIdStruct = object({
  projectId: coerce(number(), string(), (value) => +value)
});

export type ReadProjectDto = Infer<typeof ReadProjectStruct>;
export type CreateProjectDto = Infer<typeof CreateProjectStruct>;
export type CreateCommentDto = Infer<typeof CreateCommentStruct>;
