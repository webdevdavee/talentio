import { footerList } from "@/constants";
import Image from "next/image";
import FooterForm from "../forms/FooterForm";

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#202430] p-16 m:px-4">
      <div className="flex items-start justify-between m:flex-col m:gap-10 xl:grid xl:grid-cols-2 xl:gap-20">
        <div className="flex flex-col gap-4">
          <Image
            src="/talentio-white.svg"
            width={125}
            height={125}
            alt="logo"
          />
          <p className="text-slate-300 m:text-sm">
            Great platform for the job seeker that is searching for <br /> new
            career heights and passionate about startups.
          </p>
        </div>
        <div className="flex flex-col gap-4 m:gap-2">
          <h3 className="text-white capitalize text-lg m:text-xl">
            {footerList.about.title}
          </h3>
          <div className="flex flex-col gap-4 m:gap-2">
            {footerList.about.items.map((item, i) => (
              <p key={i} className="capitalize text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 m:gap-2">
          <h3 className="text-white capitalize text-lg m:text-xl">
            {footerList.resources.title}
          </h3>
          <div className="flex flex-col gap-4">
            {footerList.resources.items.map((item, i) => (
              <p key={i} className="capitalize text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>
        <FooterForm />
      </div>
      <div className="w-full border border-slate-400 mt-24 mb-8 m:mt-12"></div>
      <p className="text-sm text-center text-slate-300">
        &copy; {currentYear} Talentio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
