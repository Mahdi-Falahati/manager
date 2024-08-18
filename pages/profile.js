import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import User from "@/model/User";
import Profile from "@/templates/Profile";

export default function Index({ data }) {
  return <Profile data={data} />;
}

export async function getServerSideProps({ req, res, params }) {
  try {
    await connectDB();
  } catch (error) {
    throw new Error("Something is worng in the server...");
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: { destination: "/sign-in" },
    };
  }
  const {
    user: { email },
  } = session;

  const user = await User.findOne({ email });
  if (!user) {
    return {
      redirect: { destination: "/sign-up" },
    };
  }

  const data = {
    email: user.email,
    lastName: user.lastName || null,
    firstName: user.firstName || null,
  };

  return {
    props: { data },
  };
}
