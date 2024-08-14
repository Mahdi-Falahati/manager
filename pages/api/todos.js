import User from "@/model/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function Handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something is worng in the server...",
    });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(400).json({
      status: "failed",
      message: "First Login after try...",
    });
  }

  const {
    user: { email },
  } = session;

  const user = await User({ email });
  if (!user) {
    return res.status(422).json({
      status: "failed",
      message: "You are not valid user...",
    });
  }

  if (req.method === "POST") {
    const { todo } = req.body;

    if (todo.title && todo.description && todo.status) {
      user.todos.push(todo);
      user.save();
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
