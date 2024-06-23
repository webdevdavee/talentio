import { auth } from "@/auth";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Mobilemenu from "@/components/layouts/Mobilemenu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main>
      <Mobilemenu />
      <Header session={session} />
      {children}
      <Footer />
    </main>
  );
}
