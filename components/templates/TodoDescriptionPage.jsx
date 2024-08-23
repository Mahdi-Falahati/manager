import { Router, useRouter } from "next/router";
import { TiArrowForwardOutline } from "react-icons/ti";
import { VscArrowCircleLeft } from "react-icons/vsc";

export default function TodoDescriptionPage(data) {
  const { status, title, description } = data.data;
  const router = useRouter();

  return (
    <section>
      <button
        onClick={() => router.back()}
        className="flex justify-center w-[140px] hover:bg-red-700 bg-red-600 rounded-md text-white tracking-widest  items-center outline-none text-xl my-3 py-1 font-bold italic"
      >
        <VscArrowCircleLeft className="mr-1" />
        Back
      </button>
      <p className={`${lineStyles} text-blue-950 text-xl p-2`}>
        Title <TiArrowForwardOutline className="mx-2 " /> {title}
      </p>
      <p className={`${lineStyles} text-gray-700 text-xl p-2`}>
        Description <TiArrowForwardOutline className="mx-2" /> {description}
      </p>
      <div className="flex justify-center items-center">
        <p
          className={`${lineStyles} border-purple-900 border-2 p-1 w-[220px] text-gray-800 rounded-md justify-center`}
        >
          Status <TiArrowForwardOutline className="mx-2" /> {status}
        </p>
      </div>
    </section>
  );
}

const lineStyles =
  "flex items-center font-bold italic tracking-widest my-4 shadow-md";
