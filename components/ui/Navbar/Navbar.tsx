import { useAuth } from "@/contexts/AuthContext";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import AvatarNav from "../AvatarNav/AvatarNav";

export const menuItems = [
  {
    text: "Inicio",
    url: "/#inicio",
  },
  {
    text: "Pricing",
    url: "/#pricing",
  },
  {
    text: "FAQ",
    url: "/#faq",
  },
  {
    text: "Iniciar sesión",
    url: "/login",
  },
];

export const dashboardMenuItems = [
  {
    text: "Dashboard",
    url: "/dashboard",
  },
  {
    text: "Currículum",
    url: "/dashboard/curriculum",
  },
  {
    text: "Exámenes",
    url: "/dashboard/exams",
  },
  {
    text: "Perfil",
    url: "/dashboard/profile",
  },
];

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const currentMenuItems = user ? dashboardMenuItems : menuItems;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 mx-auto w-full bg-transparent md:absolute ">
      <div className="mx-auto w-full max-w-7xl px-5">
        <nav className="mx-auto flex items-center justify-between bg-white px-5 py-2 shadow-md md:bg-transparent md:py-10 md:shadow-none">
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo_opositandos.png"
              alt="Opositandos Logo"
              width={275}
              height={75}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden items-center space-x-6 md:flex">
            {currentMenuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-gray-900 transition-colors hover:text-brand"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <AvatarNav user={user} signOut={signOut} />
              </li>
            ) : (
              <li>
                <Link
                  href="/register"
                  className="rounded-full bg-brand px-8 py-3 text-white transition-colors hover:bg-brand-dark"
                >
                  Comienza ahora
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <HiOutlineXMark /> : <HiBars3 />}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="bg-white shadow-lg md:hidden">
          <ul className="flex flex-col space-y-4 px-6 pb-6 pt-1">
            {currentMenuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="block text-gray-900 hover:text-brand"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            {user ? (
              <li>Avatar</li>
            ) : (
              <li>
                <Link
                  href="/register"
                  className="block w-fit rounded-full bg-brand px-5 py-2 text-white hover:bg-brand-dark"
                  onClick={toggleMenu}
                >
                  Comienza ahora
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;
