import Image from "next/image";
import SidebarNav from "./SidebarNav";
import Link from "next/link";

const Sidebar = async () => {
  return (
    <aside className="sticky top-0 w-[17%] h-screen bg-[#F5F5F5] flex flex-col justify-between py-6 px-4 m:hidden xl:w-[30%]">
      <section>
        <Link href="/">
          <Image
            src="/talentio.svg"
            width={125}
            height={125}
            alt="logo"
            className="mb-12"
          />
        </Link>
        <SidebarNav />
      </section>
      {/* <div className="flex gap-4 items-center">
        <Image
          src={session?.user.image as string}
          width={40}
          height={40}
          alt="user-img"
          className="rounded-full "
        />
        <span>
          <p className="font-medium">{session?.user.name}</p>
          <p className="text-gray-600 font-light text-sm">
            {session?.user.email}
          </p>
        </span>
      </div> */}
    </aside>
  );
};

export default Sidebar;
