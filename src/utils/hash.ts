import argon from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon.hash(password);
  return hashedPassword;
};
