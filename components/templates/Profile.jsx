import TextInput from "@/elements/TextInput";
import { useRouter } from "next/router";
import { useState } from "react";

import { TiUserOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { TiArrowDownOutline } from "react-icons/ti";

export default function Profile({ data }) {
  const { email, firstName, lastName } = data;
  const [stateFirstName, setFirstName] = useState("");
  const [stateLastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const saveDataHandler = async () => {
    const req = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
        firstName: stateFirstName,
        lastName: stateLastName,
        password,
      }),
      headers: { "Content-Type": "applicaion/json" },
    });

    const res = await req.json();
    if (res.status === "success") {
      router.reload();
    }
  };

  return (
    <div>
      <h1 className="flex items-center underline italic font-bold text-2xl tracking-widest text-gray-600">
        <TiUserOutline className="mx-2" />
        Profile
      </h1>
      <p className="flex items-center font-bold italic my-2 py-3 shadow-lg mx-2 px-2">
        <span className="w-[90px]">Email</span>
        <TiArrowForwardOutline className="mx-2" /> {email}
      </p>

      {firstName && lastName ? null : (
        <h4 className="mt-5 mb-3 mx-2 font-bold tracking-wide text-xl flex items-end">
          Complete Your Information <TiArrowDownOutline className="mx-2" />
        </h4>
      )}

      {firstName ? (
        <p className="flex items-center font-bold italic my-2 py-3 shadow-lg mx-2 px-2">
          <span className="w-[90px]">First Name</span>
          <TiArrowForwardOutline className="mx-2" /> {firstName}
        </p>
      ) : (
        <TextInput
          label="Enter Your First Name"
          onChange={setFirstName}
          value={stateFirstName}
        />
      )}
      {lastName ? (
        <p className="flex items-center font-bold italic my-2 py-3 shadow-lg mx-2 px-2">
          <span className="w-[90px]">Last Name</span>
          <TiArrowForwardOutline className="mx-2" /> {lastName}
        </p>
      ) : (
        <TextInput
          label="Enter Your Last Name"
          onChange={setLastName}
          value={stateLastName}
        />
      )}
      {firstName && lastName ? null : (
        <>
          <TextInput
            label="Enter Your Password"
            onChange={setPassword}
            value={password}
          />
          <div className="flex justify-end items-center mt-5 flex-wrap">
            <button
              onClick={saveDataHandler}
              className="w-[200px] hover:bg-green-700 text-center my-3 mx-1 bg-green-600 rounded-md text-white tracking-widest  py-2 font-bold"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}
