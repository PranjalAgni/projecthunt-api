import { coerce, defaulted, number, object, string } from "superstruct";

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
