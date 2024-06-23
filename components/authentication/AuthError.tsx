import Link from "next/link";

const AuthError = () => {
  return (
    <section className="w-full h-screen">
      <div className="flex h-screen">
        <span className="w-[50%] flex flex-col items-center justify-center gap-10 flex-wrap p-8 m:w-full">
          <h1 className="text-5xl text-center">Oh no! Something went wrong!</h1>
          <Link
            href="/sign-in"
            className="px-5 py-2 bg-primary text-white text-center"
          >
            Back to log in
          </Link>
        </span>
        <picture className="auth-error w-[50%] m:hidden"></picture>
      </div>
    </section>
  );
};

export default AuthError;
