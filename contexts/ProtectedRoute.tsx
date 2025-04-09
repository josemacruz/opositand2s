"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";

// List of public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/", // Add landing page
  "/login",
  "/signup",
  "/verify-email",
  "/reset-password",
  "/update-password",
];

export default function ProtectedRoute({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && !PUBLIC_ROUTES.includes(pathname)) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      window.location.assign(redirectUrl);
    }
  }, [user, isLoading, pathname]);

  // Show loading state only if actually loading
  if (isLoading) {
    return <Loader />;
  }

  // Only render children if we're on a public route or user is authenticated
  if (PUBLIC_ROUTES.includes(pathname) || user) {
    return <>{children}</>;
  }

  return null;
}
