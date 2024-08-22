import Task from "@/modules/Task";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const req = await fetch("/api/todos");
    const res = await req.json();
    setTodos(res.todos);
  };

  return (
    <div className="flex justify-around items-start flex-wrap">
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
    </div>
  );
}