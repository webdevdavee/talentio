import useClickOutside from "@/hooks/useClickOutside";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";

type showMyApplicationProps = {
  applicationToShow: UserApplication | undefined;
  showMyApplication: boolean;
  setShowMyApplication: React.Dispatch<React.SetStateAction<boolean>>;
};

const SeeMyApplication = ({
  applicationToShow,
  showMyApplication,
  setShowMyApplication,
}: showMyApplicationProps) => {
  const seeMyApplicationRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside profile dialog
  useClickOutside(seeMyApplicationRef, () => {
    setShowMyApplication(false);
    useOverlayStore.setState({ overlay: false });
  });

  console.log(applicationToShow);

  return (
    <>
      {showMyApplication && applicationToShow && (
        <section
          ref={seeMyApplicationRef}
          className="w-[30%] max-h-[60%] modal z-[36] border-[1px] border-gray-300 p-6 bg-white overflow-y-auto custom-scrollbar"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              Date submitted:{" "}
              {convertDateFormat(applicationToShow.createdAt as Date)}
            </p>
            <span className="flex flex-col">
              <h4 className="font-medium">Name</h4>
              <p>
                {applicationToShow.firstname} {applicationToShow.lastname}
              </p>
            </span>
            <span className="flex flex-col">
              <h4 className="font-medium">Email</h4>
              <p>{applicationToShow.email}</p>
            </span>
            <span className="flex flex-col">
              <h4 className="font-medium">Phone</h4>
              <p>{applicationToShow.phone}</p>
            </span>
            <span className="flex flex-col">
              <h4 className="font-medium">Nationality</h4>
              <p>{applicationToShow.nationality}</p>
            </span>
            <span className="flex flex-col">
              <h4 className="font-medium">Cover letter</h4>
              <p>{applicationToShow.coverletter}</p>
            </span>
            <Link
              href={applicationToShow.resume}
              target="blank"
              className="flex flex-col"
            >
              <h4 className="font-medium">Resume</h4>
              <p className="underline">{applicationToShow?.resume}</p>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default SeeMyApplication;
