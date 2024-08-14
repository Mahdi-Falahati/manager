import BurgerMenu from "@/elements/BurgerMenu";
import NavBarItems from "@/elements/NavBarItems";

export default function Menu() {
  return (
    <nav>
      <div className="flex-row items-left justify-between md:flex hidden ">
        <NavBarItems />
      </div>
      <BurgerMenu />
    </nav>
  );
}
