import Header from "@/components/Header";
// VITAL CHANGE: Import from @clerk/nextjs for Next.js App Router projects
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "A LinkedIn clone built with Next.js and Clerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
         
        >
          {/* Toaster for notifications will go here */}

          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>

          {/* Main content area */}
          <main className="max-w-6xl mx-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}