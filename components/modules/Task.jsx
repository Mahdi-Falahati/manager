import { GiArcher } from "react-icons/gi";

export default function Task({ title, next, back }) {
  return (
    <section className="m-2 p-1 shadow-xl">
      <div className="flex justify-around items-start px-1">
        <GiArcher className="mr-1 text-2xl w-[30px]" />
        <p className="text-justify font-bold text-gray-700 flex items-start">
          {title}
        </p>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        {back && (
          <button className={`${btnStyles} shadow-red-300`}>{back}</button>
        )}
        {next && (
          <button className={`${btnStyles} shadow-green-300`}>{next}</button>
        )}
      </div>
    </section>
  );
}

const btnStyles =
  "font-bold w-[120px] italic text-gray-600 hover:text-gray-800 shadow-md p-2 rounded-xl tracking-wider my-3 mx-1";
