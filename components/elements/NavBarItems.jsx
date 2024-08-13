import Link from "next/link";
import { signOut } from "next-auth/react";

import { BiPencil } from "react-icons/bi";
import { FcTreeStructure } from "react-icons/fc";
import { GiPirateSkull } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";

export default function NavBarItems() {
  return (
    <>
      <Link href="/" className={linkStyles}>
        Todos
        <FcTreeStructure className="ml-1 text-2xl" />
      </Link>
      <Link href="/add-todo" className={linkStyles}>
        Add Todo
        <BiPencil className="ml-1 text-2xl  text-orange-700" />
      </Link>
      <Link href="/profile" className={linkStyles}>
        Profile
        <GiPirateSkull className="ml-1 text-2xl  text-black" />
      </Link>
      <button onClick={() => signOut()} className={linkStyles}>
        Log out
        <BiLogOutCircle className="ml-1 text-2xl  text-red-700" />
      </button>
    </>
  );
}

const linkStyles =
  "italic font-bold flex justify-center items-center text-xl text-gray-600 tracking-widest mx-2 hover:text-gray-900";
