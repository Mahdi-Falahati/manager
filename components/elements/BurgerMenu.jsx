import { useState } from "react";

import NavBarItems from "./navBarItems";

export default function BurgerMenu() {
  const [visibility, setvisibility] = useState(false);
  return (
    <>
      <div className="md:hidden absolute m-4 top-0 right-0">
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
        <secion className="md:hidden absolute left-0 right-0 min-h-[350px] z-10 top-14">
          <div className="flex flex-col justify-around min-h-[250px] bg-white">
            <NavBarItems />
          </div>
        </secion>
      )}
    </>
  );
}

const lineStyles = "w-[45px] h-[4px] rounded-2xl bg-gray-700 inline-block";
