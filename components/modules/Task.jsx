import { GiArcher } from "react-icons/gi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { TiArrowBackOutline } from "react-icons/ti";

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

  return (
    <section className="mx-2 mt-5 p-1 shadow-xl">
      <div className="flex justify-start items-start px-1">
        <GiArcher className="mr-1 text-2xl w-[30px]" />
        <p className="text-justify font-bold text-gray-700 flex items-start">
          {title}
        </p>
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
    </section>
  );
}

const btnStyles =
  "capitalize font-bold w-[120px] flex items-center justify-center italic text-gray-600 hover:text-gray-800 shadow-md p-2 rounded-xl tracking-wider my-3 mx-1";
