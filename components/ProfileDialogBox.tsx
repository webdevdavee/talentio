import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ProfileDialogBox = () => {
  return (
    <section className="absolute right-14 top-16 bg-white p-3 drop-shadow-md z-10">
      <div className="flex flex-col gap-3">
        <Link href="/user/dashboard" className="">
          Go to dashboard
        </Link>
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => signOut()}
        >
          <Image src="/power.svg" width={20} height={20} alt="log-out" />
          <p className="text-red-500 ">Log out</p>
        </button>
      </div>
    </section>
  );
};

export default ProfileDialogBox;
