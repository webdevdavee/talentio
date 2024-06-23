"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import UserProfileBtn from "../ui/UserProfileBtn";

type HeaderProps = {
  session: Session | null;
};

const Header = ({ session }: HeaderProps) => {
  const pathname = usePathname();

  const handleShowMobileMenu = () => {
    useMobileMenuStore.setState({ menu: true });
    useOverlayStore.setState({ overlay: true });
  };

  return (
    <header className="w-full bg-white px-16 py-4 border-b border-b-gray-200 sticky top-0 z-30 drop-shadow-sm m:px-4">
      <nav className="w-full">
        <div className="flex items-center justify-between m:block">
          <div className="flex items-center gap-16 m:justify-between">
            <button
              type="button"
              onClick={handleShowMobileMenu}
              className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
            >
              <Image src="/menu.svg" width={25} height={25} alt="menu" />
            </button>
            <Link href="/">
              <Image src="/talentio.svg" width={125} height={125} alt="logo" />
            </Link>
            {session ? (
              <UserProfileBtn
                session={session}
                className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
              />
            ) : (
              <Link
                href="/sign-in"
                className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
              >
                <Image
                  src="/person-circle.svg"
                  width={25}
                  height={25}
                  alt="menu"
                />
              </Link>
            )}
            <div className="flex items-center gap-8 m:hidden">
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
          <UserProfileBtn session={session} className="m:hidden" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
