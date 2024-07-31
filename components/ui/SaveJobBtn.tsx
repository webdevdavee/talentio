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
  const renderContent = () => {
    if (isLoading) {
      return (
        <Image
          className="animate-spin"
          width={25}
          height={25}
          src="/loading-spinner.svg"
          alt="wishlist"
        />
      );
    }

    const imageSrc = savedJob ? "/love-filled.svg" : "/love.svg";

    return (
      <Image
        src={imageSrc}
        width={25}
        height={25}
        alt="save-job"
        onClick={saveAJob}
        className="cursor-pointer"
      />
    );
  };

  return <section className={className}>{renderContent()}</section>;
};

export default SaveJobBtn;
