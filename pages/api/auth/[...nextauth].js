import User from "@/model/User";
import { ValidateEmail, VerifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Something is worng in the server...");
        }

        const { email, password } = credentials;
        const isValid = await ValidateEmail(email);

        if (!email || !password || !isValid) {
          throw new Error("Email or password is inValid...");
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("You are not registered...");
        }

        const passwordValidation = await VerifyPassword(
          user.password,
          password
        );
        if (passwordValidation) {
          throw new Error("Email or password incorrect..");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
