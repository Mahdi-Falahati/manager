import { GiImp } from "react-icons/gi";
import { BiSolidHourglass } from "react-icons/bi";

export default function Layout({ children }) {
  return (
    <>
      <header className="container mx-auto mb-3">
        <h1 className="italic font-bold text-2xl flex items-center text-gray-900 tracking-widest ">
          Manager
          <BiSolidHourglass className="text-green-600 text-xl ml-1" />
        </h1>
      </header>
      <main className="container mx-auto min-h-[86vh]">{children}</main>
      <footer className="italic font-bold flex items-center justify-center tracking-widest text-gray-500 border-t border-t-gray-500 py-3">
        Creted by
        <a
          href="https://github.com/Mahdi-Falahati"
          target="_blank"
          className="mx-1 text-gray-700"
        >
          Mahdi-Falahati
        </a>
        <GiImp className="text-2xl ml-1" />
      </footer>
    </>
  );
}
