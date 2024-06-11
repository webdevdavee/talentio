import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main>
      <Header session={session} />
      {children}
      <Footer />
    </main>
  );
}
