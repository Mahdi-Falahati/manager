import Link from "next/link";
import { useState } from "react";

import { BiPencil } from "react-icons/bi";
import { FcTreeStructure } from "react-icons/fc";
import { GiPirateSkull } from "react-icons/gi";

export default function BurgerMenu() {
  const [visibility, setvisibility] = useState(false);
  return (
    <>
      <div className="sm:hidden absolute m-4 top-0 right-0">
        <button
          onClick={() => setvisibility(!visibility)}
          className="flex flex-col h-[30px] justify-around items-center"
        >
          <span className={lineStyles}></span>
          <span className={lineStyles}></span>
          <span className={lineStyles}></span>
        </button>
      </div>
      {visibility && (
        <secion className="sm:hidden absolute left-0 right-0 min-h-[350px] z-10 top-14">
          <div className="flex flex-col justify-around min-h-[250px] bg-white">
            <Link href="/" className={linkStyles}>
              <FcTreeStructure className="mr-1 text-2xl" />
              Todos
            </Link>
            <Link href="/add-todo" className={linkStyles}>
              <BiPencil className="mr-1 text-2xl  text-orange-700" />
              Add Todo
            </Link>
            <Link href="/profile" className={linkStyles}>
              <GiPirateSkull className="mr-1 text-2xl  text-black" />
              Profile
            </Link>
          </div>
        </secion>
      )}
    </>
  );
}

const lineStyles = "w-[45px] h-[4px] rounded-2xl bg-gray-700 inline-block";
const linkStyles =
  "italic font-bold flex justify-center items-center text-xl text-gray-600 tracking-widest mx-2 hover:text-gray-900";
