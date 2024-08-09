import { compare, hash } from "bcryptjs";

async function HashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function VerifyPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}

export { HashPassword, VerifyPassword };
