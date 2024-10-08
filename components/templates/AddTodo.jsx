import RadioButton from "@/elements/RadioButton";
import Textarea from "@/elements/Textarea";
import TextInput from "@/elements/TextInput";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { FcTreeStructure } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcAdvance } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const router = useRouter();

  const saveTodoHandler = async () => {
    if (title && description && status) {
      const request = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title, description, status }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();
      if (response.status === "success") {
        toast.success(response.message);
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      } else {
        toast.warning(response.message);
      }
    } else if (!title) {
      toast.error("Enter the Title...");
    } else if (!description) {
      toast.error("Enter the Description...");
    } else {
      toast.error("Enter the Stataus...");
    }
  };

  return (
    <section>
      <h1 className="my-10 flex items-center text-2xl italic tracking-widest underline text-gray-700">
        <AiOutlinePlusCircle className="mr-3" />
        Add Todo
      </h1>
      <div>
        <TextInput label={"Title"} onChange={setTitle} vlaue={title}>
          <FcTreeStructure />
        </TextInput>

        <section className="flex flex-wrap justify-around items-center my-5">
          <RadioButton
            value={"todo"}
            title={"Todo"}
            onChange={setStatus}
            status={status}
            bgColor="bg-yellow-500"
          >
            <FcTreeStructure />
          </RadioButton>

          <RadioButton
            value={"progress"}
            title={"In Progress"}
            onChange={setStatus}
            status={status}
            bgColor="bg-purple-600"
          >
            <FcBarChart />
          </RadioButton>

          <RadioButton
            value={"review"}
            title={"Review"}
            onChange={setStatus}
            status={status}
            bgColor="bg-orange-500"
          >
            <FcAdvance />
          </RadioButton>

          <RadioButton
            value={"done"}
            title={"Done"}
            onChange={setStatus}
            status={status}
            bgColor="bg-green-700"
          >
            <FcApproval />
          </RadioButton>
        </section>

        <Textarea
          placeholder={"Description"}
          value={description}
          onChange={setDescription}
        />
      </div>
      <div className="flex justify-around items-center mt-14 flex-col sm:flex-row">
        <button className="bg-red-700 my-3 hover:bg-red-600 text-white min-w-[220px] py-2 rounded-xl font-bold italic tracking-widest">
          Cancel
        </button>
        <button
          onClick={saveTodoHandler}
          className="bg-green-700 my-3 hover:bg-green-600 text-white min-w-[220px] py-2 rounded-xl font-bold italic tracking-widest"
        >
          Save Todo
        </button>
      </div>
      <ToastContainer limit={1} />
    </section>
  );
}
