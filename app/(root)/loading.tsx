import Loader from "@/components/Loader";

const loading = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Loader className="loader" />
    </section>
  );
};

export default loading;
