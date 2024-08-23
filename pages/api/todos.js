import User from "@/model/User";
import connectDB from "@/utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import SortTodos from "@/utils/SortTodos";

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
  } else if (req.method === "GET") {
    const sortedTodos = SortTodos(user.todos);
    return res.status(200).json({ status: "success", todos: sortedTodos });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Data Inavalid..." });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    return res.status(200).json({ status: "success" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res
        .status(422)
        .json({ status: "failed", message: "Data Inavalid..." });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $pull: { todos: { _id: id } } }
    );
    return res.status(200).json({});
  }

  return res
    .status(400)
    .json({ status: "failed", message: "Your Request is inavlid..." });
}
