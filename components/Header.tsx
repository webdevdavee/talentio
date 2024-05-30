"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import ProfileDialogBox from "./ProfileDialogBox";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  const [showProfileDialogBox, setShowProfileDialogBox] = useState(false);

  return (
    <header className="w-full bg-white px-16 py-4 border-b border-b-gray-200">
      <nav className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link href="/">
              <Image src="/talentio.svg" width={125} height={125} alt="logo" />
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/jobs"
                className={`transition duration-200 hover:text-primary ${
                  pathname === "/jobs" && "border-b-[2px] border-b-primary"
                }`}
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className={`transition duration-200 hover:text-primary ${
                  pathname === "/companies" && "border-b-[2px] border-b-primary"
                }`}
              >
                Browse Companies
              </Link>
            </div>
          </div>
          {!session ? (
            <div>
              <Link href="/sign-in" className="px-4 py-3">
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 rounded bg-primary text-white"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              type="button"
              className="flex items-center gap-3"
              onClick={() => setShowProfileDialogBox((prev) => !prev)}
            >
              <Image
                src={session.user.image ?? "/images/default-avatar.webp"}
                width={40}
                height={40}
                alt="user-profile"
                className="rounded-full"
              />
              {showProfileDialogBox && <ProfileDialogBox />}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
