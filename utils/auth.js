import { compare, hash } from "bcryptjs";

async function HashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function VerifyPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}

const ValidateEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export { HashPassword, VerifyPassword, ValidateEmail };
