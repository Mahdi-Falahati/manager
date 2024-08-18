import User from "@/model/User";
import connectDB from "@/utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { VerifyPassword } from "@/utils/auth";

export default async function Handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something is worng in the server...",
    });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(400).json({
      status: "failed",
      message: "First Login after try...",
    });
  }

  const {
    user: { email },
  } = session;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({
      status: "failed",
      message: "You are not valid user...",
    });
  }

  if (req.method === "POST") {
    const { firstName, lastName, password } = JSON.parse(req.body);
    const isValid = await VerifyPassword(password, user.password);

    if ((firstName || lastName) && isValid) {
      if (!user.firstName) {
        user.firstName = firstName || "";
      }
      if (!user.lastName) {
        user.lastName = lastName || "";
      }
      await user.save();
      return res
        .status(201)
        .json({ status: "success", message: "your information saved..." });
    } else {
      return res
        .json(400)
        .json({ status: "failed", message: "Enter valid value..." });
    }
  }

  return res
    .status(503)
    .json({ status: "failed", message: "your request is invalid..." });
}
