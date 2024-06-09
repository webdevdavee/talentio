import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className="flex">
        <DashboardSidebar />
        <div className="flex flex-col w-[83%]">
          <DashboardHeader />
          {children}
        </div>
      </section>
    </main>
  );
}
