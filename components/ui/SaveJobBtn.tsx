import Image from "next/image";

type SaveJobBtnProps = {
  isLoading: boolean;
  savedJob:
    | {
        userId: string;
        jobId: string;
      }
    | undefined;
  saveAJob: () => Promise<void>;
  className: string;
};

const SaveJobBtn = ({
  isLoading,
  savedJob,
  saveAJob,
  className,
}: SaveJobBtnProps) => {
  return (
    <section className={className}>
      {isLoading ? (
        <Image
          className="animate-spin"
          width={25}
          height={25}
          src="/loading-spinner.svg"
          alt="wishlist"
        />
      ) : savedJob ? (
        <Image
          src="/love-filled.svg"
          width={25}
          height={25}
          alt="save-job"
          onClick={saveAJob}
          className="cursor-pointer"
        />
      ) : (
        <Image
          src="/love.svg"
          width={25}
          height={25}
          alt="save-job"
          onClick={saveAJob}
          className="cursor-pointer"
        />
      )}
    </section>
  );
};

export default SaveJobBtn;
