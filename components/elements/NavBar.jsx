import Link from "next/link";

import { BiPencil } from "react-icons/bi";
import { FcTreeStructure } from "react-icons/fc";
import { GiPirateSkull } from "react-icons/gi";

export default function NavBar() {
  return (
    <div className="flex-row items-left justify-between sm:flex hidden w-[400px]">
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
  );
}

const linkStyles =
  "italic font-bold flex justify-center items-center text-xl text-gray-600 tracking-widest mx-2 hover:text-gray-900";
