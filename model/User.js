import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  todos: [
    {
      title: String,
      description: String,
      status: String,
    },
  ],
});

const User = models.User || model("User", userSchema);
export default User;
