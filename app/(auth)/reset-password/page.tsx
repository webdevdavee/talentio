import ResetPasswordWrapper from "@/components/ResetPasswordWrapper";

export async function generateMetadata() {
  return {
    title: "Reset Password",
    description: "Reset your password",
  };
}

const page = async () => {
  return (
    <section>
      <ResetPasswordWrapper />
    </section>
  );
};

export default page;
