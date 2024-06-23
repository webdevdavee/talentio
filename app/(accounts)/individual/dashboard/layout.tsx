import Header from "../_components/Header";
import MobileMenu from "../_components/MobileMenu";
import Sidebar from "../_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className="flex m:block">
        <MobileMenu />
        <Sidebar />
        <div className="flex flex-col w-[83%] m:w-full">
          <Header />
          {children}
        </div>
      </section>
    </main>
  );
}
