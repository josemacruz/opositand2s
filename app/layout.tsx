"use client";

import { Source_Sans_3, Manrope } from "next/font/google";
import "./globals.css";

import ComingSoonLanding from "@/components/ui/CommingSoon/CommingSoon";

const manrope = Manrope({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout() {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        <ComingSoonLanding />
        {/*
        <Analytics mode="auto" />
        <AuthProvider>
          <ProtectedRoute>
            <Navbar />
            <main className="pt-32">{children}</main>
          </ProtectedRoute>
        </AuthProvider>*/}
      </body>
    </html>
  );
}
