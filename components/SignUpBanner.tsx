import Link from "next/link";

const SignUpBanner = () => {
  return (
    <section className="mt-10">
      <div className="w-full h-[30rem] bg-primary items-center justify-center p-12 flex flex-col gap-12">
        <h2 className="text-5xl font-bold text-center text-white">
          Start posting <br />
          jobs today
        </h2>
        <Link
          href="/company/sign-up"
          className="w-fit capitalize px-3 py-2 bg-white font-medium text-primary"
        >
          Sign up for free
        </Link>
      </div>
    </section>
  );
};

export default SignUpBanner;
