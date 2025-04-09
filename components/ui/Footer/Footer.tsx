"use client";

import Link from "next/link";
import { useState } from "react";
const footerDetails = {
  company: {
    name: "Opositandos",
    description: "Tu plataforma de confianza para preparar oposiciones",
    email: "info@opositandos.com",
    phone: "+34 900 123 456",
    address: "Madrid, España",
  },
  links: {
    quick: [
      { name: "Inicio", href: "/" },
      { name: "Sobre Nosotros", href: "/about" },
      { name: "Contacto", href: "/contact" },
    ],
    legal: [
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Términos y Condiciones", href: "/terms" },
      { name: "Política de Cookies", href: "/cookies" },
    ],
  },
};

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleContactClick = async (type: "email" | "phone") => {
    setIsLoading(true);
    try {
      if (type === "email") {
        window.location.href = `mailto:${footerDetails.company.email}`;
      } else {
        window.location.href = `tel:${footerDetails.company.phone}`;
      }
    } catch (error) {
      console.error("Error al abrir contacto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerDetails.company.name}
            </h3>
            <p className="text-gray-400">{footerDetails.company.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {footerDetails.links.quick.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerDetails.links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => handleContactClick("email")}
                  disabled={isLoading}
                  className="h-auto p-0 text-gray-400 hover:text-white"
                >
                  {footerDetails.company.email}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContactClick("phone")}
                  disabled={isLoading}
                  className="h-auto p-0 text-gray-400 hover:text-white"
                >
                  {footerDetails.company.phone}
                </button>
              </li>
              <li>{footerDetails.company.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {footerDetails.company.name}.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
