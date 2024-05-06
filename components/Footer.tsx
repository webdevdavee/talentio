import { footerList } from "@/constants";
import Image from "next/image";
import FooterForm from "./FooterForm";

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#202430] p-16">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <Image
            src="/talentio-white.svg"
            width={125}
            height={125}
            alt="logo"
          />
          <p className="text-slate-300">
            Great platform for the job seeker that is searching for <br /> new
            career heights and passionate about startups.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-white capitalize text-lg">
            {footerList.about.title}
          </h3>
          <div className="flex flex-col gap-4">
            {footerList.about.items.map((item, i) => (
              <p key={i} className="capitalize text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-white capitalize text-lg">
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
      <div className="w-full border border-slate-400 mt-24 mb-8"></div>
      <p className="text-sm text-center text-slate-300">
        &copy; {currentYear} Talentio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
