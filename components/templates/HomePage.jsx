import Loading from "@/elements/Loading";
import Task from "@/modules/Task";
import Link from "next/link";
import { useState, useEffect } from "react";
import { VscGitFetch } from "react-icons/vsc";
import { VscArrowCircleRight } from "react-icons/vsc";

export default function HomePage() {
  const [todos, setTodos] = useState("loading");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const req = await fetch("/api/todos");
    const res = await req.json();

    if (res.status === "success" && Object.keys(res.todos).length != 0) {
      setTodos(res.todos);
    } else {
      setTodos("nothing");
    }
  };

  return (
    <div>
      <div className="flex justify-around items-start flex-wrap">
        {todos === "loading" ? (
          <Loading text="Loading Todos..." />
        ) : (
          <>
            <section className="w-[300px] my-5 mx-2">
              <h1 className="font-bold bg-yellow-500 rounded-md text-center py-1 mx-2 text-xl italic text-white tracking-widest">
                Todo
              </h1>
              {todos.todo?.map((todo) => (
                <Task
                  next="progress"
                  key={todo._id}
                  data={todo}
                  fetchData={fetchData}
                />
              ))}
            </section>
            <section className="w-[300px] my-5 mx-2">
              <h1 className="font-bold bg-purple-600 rounded-md text-center py-1 mx-2 text-xl italic text-white tracking-widest">
                In Progress
              </h1>
              {todos.progress?.map((todo) => (
                <Task
                  back="todo"
                  next="review"
                  key={todo._id}
                  data={todo}
                  fetchData={fetchData}
                />
              ))}
            </section>
            <section className="w-[300px] my-5 mx-2">
              <h1 className="font-bold bg-orange-500 rounded-md text-center py-1 mx-2 text-xl italic text-white tracking-widest">
                Review
              </h1>
              {todos.review?.map((todo) => (
                <Task
                  back="progress"
                  next="done"
                  key={todo._id}
                  data={todo}
                  fetchData={fetchData}
                />
              ))}
            </section>
            <section className="w-[300px] my-5 mx-2">
              <h1 className="font-bold bg-green-700 rounded-md text-center py-1 mx-2 text-xl italic text-white tracking-widest">
                Done
              </h1>
              {todos.done?.map((todo) => (
                <Task
                  back="review"
                  data={todo}
                  key={todo._id}
                  fetchData={fetchData}
                />
              ))}
            </section>
          </>
        )}
      </div>
      {todos === "nothing" ? (
        <>
          <p className="text-center font-bold text-red-900 text-xl tracking-widest">
            You do not have any todos...
          </p>
          <p className="text-center text-gray-600 font-bold italic">
            You can add todo
          </p>
          <p className="flex justify-center items-center text-gray-600 font-bold italic">
            Do you want to add todo
            <VscGitFetch className="ml-2" />
          </p>
          <Link
            href="/add-todo"
            className="tracking-wider underline text-blue-900 hover:text-blue-950 font-bold italic flex justify-center items-center"
          >
            Click Here
            <VscArrowCircleRight className="ml-2" />
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
