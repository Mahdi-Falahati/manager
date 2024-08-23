import User from "@/model/User";
import TodoDescriptionPage from "@/templates/TodoDescriptionPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { VscCopilot } from "react-icons/vsc";
import { VscArrowCircleLeft } from "react-icons/vsc";

export default function Index(data) {
  const router = useRouter();
  if (data.error) {
    return (
      <>
        <p className="text-gray-600 tracking-wider font-bold text-xl italic flex justify-center items-center">
          {data.error}
          <VscCopilot className="ml-2 text-red-800" />
        </p>
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center outline-none text-purple-800 text-xl underline w-full mt-3 font-bold italic"
        >
          <VscArrowCircleLeft className="mr-1" />
          Back
        </button>
      </>
    );
  }
  return <TodoDescriptionPage data={data} />;
}

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

  try {
    await connectDB();
  } catch (error) {
    return { props: { error: "SomeThing wrong! please try agin latar..." } };
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: { destination: "/sign-in" },
    };
  }

  try {
    const todo = await User.findOne({ "todos._id": id }, { "todos.$": 1 });
    const { title, status, description } = todo.todos[0];

    return { props: { title, status, description, error: false } };
  } catch (error) {
    return {
      props: { error: "Todo is Not Exist..." },
    };
  }
}
