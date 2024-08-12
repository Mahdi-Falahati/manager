import User from "@/model/User";
import { HashPassword, ValidateEmail } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function Handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ status: "failed", messagge: "Your request is not vaild..." });
  }

  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something is worng in the server...",
    });
  }

  const { email, password } = req.body;
  const isValid = await ValidateEmail(email);

  if (!email || !password || !isValid) {
    return res
      .status(400)
      .json({ status: "failed", message: "Email or password is inValid..." });
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res
      .status(400)
      .json({ status: "failed", message: "You have already registered..." });
  }

  const hashed = await HashPassword(password);
  const user = await User.create({ email, password: hashed });

  return res.status(200).json({
    status: "success",
    message: "Registration was successful...",
    data: { email: user.email },
  });
}
