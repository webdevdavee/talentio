import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type ProfileDialogBoxProps = {
  session: Session;
};

const ProfileDialogBox = ({ session }: ProfileDialogBoxProps) => {
  return (
    <section className="absolute right-14 top-16 bg-white drop-shadow-xl z-10">
      <div className="flex flex-col">
        <div className="flex justify-center items-center gap-3 p-2 mb-2 border-b border-b-gray-200">
          <Image
            src={session.user.image ?? "/images/default-avatar.webp"}
            width={60}
            height={60}
            alt="user-profile"
            className="rounded-full"
          />
          <span className="flex flex-col">
            <p className="text-[0.9rem]">{session.user.name}</p>
            <p className="text-[0.9rem]">{session.user.email}</p>
          </span>
        </div>
        <Link
          href="/individual/dashboard"
          className="p-2 hover:transition hover:bg-gray-100"
        >
          Go to dashboard
        </Link>
        <button
          type="button"
          className="p-2 flex items-center gap-2 hover:transition hover:bg-gray-100"
          onClick={() => signOut()}
        >
          <Image src="/power.svg" width={20} height={20} alt="log-out" />
          <p className="text-red-500">Log out</p>
        </button>
      </div>
    </section>
  );
};

export default ProfileDialogBox;
