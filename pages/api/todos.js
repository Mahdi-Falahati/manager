import User from "@/model/User";
import connectDB from "@/utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
    const todo = req.body;
    const { title, status, description } = todo;
    if (title && description && status) {
      user.todos.push({ title, status, description });
      await user.save();
      return res.status(200).json({
        status: "success",
        message: "your todo is created...",
        data: { todo },
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message:
          "please write a description and a title and select a status for your todo...",
      });
    }
  }

  res.status(200).json({});
}
