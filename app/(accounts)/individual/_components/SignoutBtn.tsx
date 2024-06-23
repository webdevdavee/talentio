"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

const SignoutBtn = () => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
      <Image src="/power.svg" width={25} height={25} alt="power" />
    </button>
  );
};

export default SignoutBtn;
