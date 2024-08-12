import Link from "next/link";
import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";

export default function SignUp() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <section className="flex flex-col rounded-2xl mx-2 shadow-2xl p-5 items-center border">
        <h2 className="text-gray-700 flex items-center justify-center font-bold italic text-2xl tracking-widest">
          <BiSolidUser className="mr-2" />
          Sign-up Form
        </h2>
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email :
          </label>
          <input
            id="email"
            className={inputStyles}
            type="email"
            placeholder="Write your Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className={labelStyles}>
            Password :
          </label>
          <input
            id="password"
            className={inputStyles}
            type="password"
            placeholder="Write your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button className="text-white hover:bg-green-700 bg-green-600 h-9 rounded-xl w-[150px] mt-4 mb-1 tracking-widest font-bold italic">
          Register
        </button>
        <div className="flex justify-center font-bold italic text-sm">
          <p>Have An Account </p>
          <Link href="/sign-in" className="text-blue-700 underline mx-2">
            Sign-in
          </Link>
        </div>
      </section>
    </div>
  );
}

const inputStyles = "outline-none border-none my-4 min-h-[30px]";
const labelStyles =
  "font-bold italic tracking-wide text-gray-600 mr-2 inline-block min-w-[100px]";
