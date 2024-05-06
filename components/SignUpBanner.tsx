const SignUpBanner = () => {
  return (
    <section className="px-16 mt-10">
      <div className="w-full h-[30rem] bg-primary items-center justify-center p-12 flex flex-col gap-12">
        <h2 className="text-5xl font-bold text-center text-white">
          Start posting <br />
          jobs today
        </h2>
        <p className="text-white text-center font-medium">
          Start posting jobs for only $10.
        </p>
        <button
          type="button"
          className="w-fit capitalize px-3 py-2 bg-white font-medium text-primary"
        >
          Sign up for free
        </button>
      </div>
    </section>
  );
};

export default SignUpBanner;
