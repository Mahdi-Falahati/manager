import Link from "next/link";
import { GiArcher } from "react-icons/gi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { TiArrowBackOutline } from "react-icons/ti";
import { VscTrash } from "react-icons/vsc";

import { toast, ToastContainer } from "react-toastify";

export default function Task({ data, next, back, fetchData }) {
  const { _id, title } = data;

  const changeStatus = async (status) => {
    const req = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id: _id, status }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await req.json();

    if (res.status === "success") {
      fetchData();
    }
  };

  const deleteTodoHandler = async () => {
    const req = await fetch("/api/todos", {
      method: "delete",
      body: JSON.stringify({ id: _id }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    if (res.status === "success") {
      fetchData();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <section className="mx-2 mt-5 p-1 shadow-xl">
      <div className="flex justify-end">
        <button
          onClick={deleteTodoHandler}
          className="p-1 mx-1 rounded-md hover:bg-red-700 hover:text-white bg-white text-red-700"
        >
          <VscTrash className="text-xl" />
        </button>
      </div>
      <div className="flex justify-start items-start px-1">
        <GiArcher className="mr-1 text-2xl w-[30px]" />
        <Link
          href={`/todo-details/${_id}`}
          className="text-justify font-bold text-blue-950 hover:text-blue-800 flex items-start"
        >
          {title}
        </Link>
      </div>
      <div className="flex justify-around items-center flex-wrap">
        {back && (
          <button
            className={`${btnStyles} shadow-red-300`}
            onClick={() => changeStatus(back)}
          >
            <TiArrowBackOutline className="mr-1" />
            {back}
          </button>
        )}
        {next && (
          <button
            className={`${btnStyles} shadow-green-300`}
            onClick={() => changeStatus(next)}
          >
            <TiArrowForwardOutline className="mr-1" />
            {next}
          </button>
        )}
      </div>
      <ToastContainer limit={1} />
    </section>
  );
}

const btnStyles =
  "capitalize font-bold w-[120px] flex items-center justify-center italic text-gray-600 hover:text-gray-800 shadow-md p-2 rounded-xl tracking-wider my-3 mx-1";
