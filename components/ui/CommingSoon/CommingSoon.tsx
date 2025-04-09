"use client";

import { supabase } from "@/utils/supabase";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useState, FormEvent } from "react";

export default function ComingSoonLanding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("waiting_list").insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          setStatus("error");
          setMessage("Ese correo ya está registrado.");
        } else {
          throw error;
        }
        return;
      }

      // Enviar confirmación por correo
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setStatus("success");
      setMessage("Gracias por apuntarte ✨");
      setEmail("");
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Hubo un error. Por favor, inténtalo de nuevo.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute bottom-0 left-0 top-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
      <header className="fixed left-0 right-0 top-0 z-50 mx-auto w-full bg-transparent md:absolute ">
        <div className="mx-auto w-full max-w-7xl px-5">
          <div className="mx-auto flex items-center justify-center px-5 py-2 bg-transparent md:py-10 md:shadow-none">
            <Image
              src="/logo_opositandos.png"
              alt="Opositandos Logo"
              width={275}
              height={75}
              className="rounded-full"
            />
          </div>
        </div>
      </header>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900  mb-4">
        ¡Muy pronto!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8">
        Estamos trabajando en algo increíble para ayudarte a preparar tus
        oposiciones. Déjanos tu email y te avisaremos cuando esté disponible.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={status === "loading"}
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-yellow-600 text-gray-900 px-5 py-3 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando..." : "Avisarme"}
          </button>
        </div>
        {message && (
          <p
            className={`mt-2 text-sm ${
              status === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
      <footer className="text-xs text-gray-400 mt-12">
        &copy; {new Date().getFullYear()} Opositandos. Todos los derechos
        reservados.
      </footer>
    </div>
  );
}
