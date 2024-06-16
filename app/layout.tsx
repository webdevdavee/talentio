import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Overlay from "@/components/Overlay";

const dm_sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "300", "400", "500", "700"],
});

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
        <body className={dm_sans.className}>
          <Overlay />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
