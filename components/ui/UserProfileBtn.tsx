import Image from "next/image";
import Link from "next/link";
import ProfileDialogBox from "./ProfileDialogBox";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { Session } from "next-auth";

type UserProfileBtnProps = {
  session: Session | null;
  className: string;
};

const UserProfileBtn = ({ session, className }: UserProfileBtnProps) => {
  const profileDialogRef = useRef<HTMLDivElement>(null);
  const [showProfileDialogBox, setShowProfileDialogBox] = useState(false);

  // Handle clicks outside profile dialog
  useClickOutside(profileDialogRef, () => {
    setShowProfileDialogBox(false);
  });

  return (
    <section className={className}>
      {!session ? (
        <div className="m:hidden">
          <Link href="/sign-in" className="px-4 py-3">
            Login
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2 bg-primary rounded text-white"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div
          ref={profileDialogRef}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowProfileDialogBox((prev) => !prev)}
        >
          <Image
            src={session.user.image as string}
            width={40}
            height={40}
            alt="user-profile"
            className="rounded-full"
          />
          {showProfileDialogBox && <ProfileDialogBox session={session} />}
        </div>
      )}
    </section>
  );
};

export default UserProfileBtn;
