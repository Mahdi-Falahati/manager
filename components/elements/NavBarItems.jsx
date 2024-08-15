import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { BiPencil } from "react-icons/bi";
import { FcTreeStructure } from "react-icons/fc";
import { GiPirateSkull } from "react-icons/gi";
import { RiAccountCircleLine, RiArrowLeftCircleLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";

export default function NavBarItems() {
  const { status } = useSession();
  const [auth, setauth] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setauth(true);
    }
  }, [status]);
  return (
    <>
      {auth ? (
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
          <button
            onClick={() => signOut()}
            className="bg-red-600 justify-center py-1 mx-4 font-bold italic text-white rounded-xl tracking-widest px-3 flex items-center"
          >
            Log out
            <AiOutlineArrowRight className="ml-1  text-white" />
          </button>
        </>
      ) : (
        <>
          <Link href="/sign-in" className={linkStyles}>
            <BiLogInCircle className="mr-1 text-xl  text-green-700" />
            Login
          </Link>
          <Link href="/sign-up" className={linkStyles}>
            <RiAccountCircleLine className="mr-1 text-xl  text-black" />
            Sign-up
          </Link>
        </>
      )}
    </>
  );
}

const linkStyles =
  "italic font-bold flex justify-center items-center text-xl text-gray-600 tracking-widest mx-2 hover:text-gray-900";
