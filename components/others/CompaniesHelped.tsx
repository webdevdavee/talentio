import Image from "next/image";

const CompaniesHelped = () => {
  return (
    <section className="mt-10 px-16 sm:px-4">
      <p className="text-gray-500 sm:text-sm">
        Companies we&apos;ve helped grow
      </p>
      <div className="w-full flex items-center justify-between gap-3 sm:flex-wrap">
        <Image src="/companies/Ibm.svg" width={110} height={110} alt="ibm" />
        <Image src="/companies/Amd.svg" width={130} height={130} alt="amd" />
        <Image
          src="/companies/Intel.svg"
          width={110}
          height={110}
          alt="intel"
        />
        <Image
          src="/companies/Virgin.svg"
          width={130}
          height={130}
          alt="virgin"
        />
        <Image
          src="/companies/Cisco.svg"
          width={110}
          height={110}
          alt="cisco"
        />
      </div>
    </section>
  );
};

export default CompaniesHelped;
