import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Overlay from "@/components/Overlay";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talentio - Job Board",
  description: "Apply for jobs at Talentio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={jost.className}>
          <Overlay />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
