"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModal";

interface UserInfoCardProps {
  readonly user: User;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const provider = user?.app_metadata?.provider;

  const router = useRouter();

  return (
    <section className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Tu cuenta</h2>
      <div className="flex items-center gap-4">
        <Image
          src={user.user_metadata?.avatar_url ?? "/logo_dragon.svg"}
          alt="Avatar"
          className="w-16 h-16 rounded-full border"
          width={64}
          height={64}
        />
        <div>
          <p className="font-medium text-gray-900">
            {user.user_metadata?.full_name || "Usuario sin nombre"}
          </p>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">
            Registrado con: {provider}
          </p>
        </div>
      </div>

      {provider !== "email" && (
        <div className="mt-6 space-y-6">
          <div className="flex gap-2 mt-1">
            <button
              onClick={() =>
                router.push(
                  `/reset-password?email=${encodeURIComponent(
                    user?.email ?? ""
                  )}`
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Cambiar contraseña
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-400 text-sm"
            >
              Borrar cuenta
            </button>
          </div>
        </div>
      )}

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </section>
  );
}
