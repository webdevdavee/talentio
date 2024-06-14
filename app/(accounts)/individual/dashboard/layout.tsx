import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className="flex">
        <Sidebar />
        <div className="flex flex-col w-[83%]">
          <Header />
          {children}
        </div>
      </section>
    </main>
  );
}
