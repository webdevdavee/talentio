import { auth } from "@/auth";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import { getCompanyByUserId } from "@/database/actions/company.actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const company = await getCompanyByUserId(session?.user.id as string);

  return (
    <main>
      <section className="flex">
        <Sidebar />
        <div className="flex flex-col w-[83%] m:w-full">
          <Header company={company} />
          {children}
        </div>
      </section>
    </main>
  );
}
