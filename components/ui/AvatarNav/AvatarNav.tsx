import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const AvatarNav = ({
  user,
  signOut,
}: {
  user: User;
  signOut: () => Promise<void>;
}) => {
  const avatarUrl = user.user_metadata.avatar_url ?? "/logo_dragon.svg";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      setIsOpen(false);
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900  truncate">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Mi Perfil
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarNav;
