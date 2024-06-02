import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  return <section>{JSON.stringify(session)}</section>;
};

export default page;
