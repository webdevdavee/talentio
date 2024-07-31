import InputBox from "@/components/ui/InputBox";
import Loader2 from "@/components/ui/Loader2";
import { hiringStages } from "@/constants";
import { updateUserApplication } from "@/database/actions/applications.actions";
import useClickOutside from "@/hooks/useClickOutside";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import {
  TEditApplicantDetailsFormSchema,
  editApplicantDetailsFormSchema,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type EditApplicantCardProps = {
  applicantToBeEdited: UserApplication | undefined;
  showEditApplicant: boolean;
  setShowEditApplicant: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditApplicantCard = ({
  applicantToBeEdited,
  showEditApplicant,
  setShowEditApplicant,
}: EditApplicantCardProps) => {
  // Set initial form values.
  const initialValues = {
    score: applicantToBeEdited?.score.toString(),
  };

  const seeApplicationRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState("");
  const [showStages, setShowStages] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TEditApplicantDetailsFormSchema>({
    resolver: zodResolver(editApplicantDetailsFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: TEditApplicantDetailsFormSchema) => {
    // Update user application field
    const field = {
      stage: stage ? stage : applicantToBeEdited?.stage,
      score: data.score && Number(data.score),
    };
    await updateUserApplication(
      field,
      applicantToBeEdited?.userId as string,
      applicantToBeEdited?.jobId as string
    );
    reset();
    location.reload();
  };

  // Handle clicks outside edit application dialog
  useClickOutside(seeApplicationRef, () => {
    setShowEditApplicant(false);
    useOverlayStore.setState({ overlay: false });
  });

  const handleSelectStage = (stage: string) => {
    setStage(stage);
    setShowStages(false);
  };

  return (
    <>
      {showEditApplicant && applicantToBeEdited && (
        <section ref={seeApplicationRef}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[30%] max-h-[55%] modal z-[36] border-[1px] border-gray-300 p-6 bg-white overflow-y-auto custom-scrollbar flex flex-col justify-between gap-6 m:w-[80%] xl:w-[60%] xl:max-h-fit"
          >
            <h2 className="font-medium">Edit applicant details</h2>
            <div className="w-full">
              <p className="font-light">Hiring stage</p>
              <button
                type="button"
                className={`p-2 border w-full capitalize ${
                  stage === "in review"
                    ? " bg-[#FEBC43] text-white"
                    : stage === "shortlisted"
                    ? " bg-[#6C67E5] text-white"
                    : stage === "interviewed"
                    ? "bg-[#3BACFF] text-white"
                    : stage === "hired"
                    ? "bg-green-500 text-white"
                    : stage === "declined"
                    ? "bg-[#FF6550] text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setShowStages((prev) => !prev)}
              >
                {stage ? stage : applicantToBeEdited?.stage}
              </button>
              {showStages && (
                <div className="mt-4 bg-white w-full border">
                  {hiringStages.map((stage, index) => (
                    <button
                      key={`${stage}-${index}`}
                      className="p-2 hover:bg-gray-100 capitalize cursor-pointer w-full text-left"
                      onClick={() => handleSelectStage(stage)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectStage(stage);
                        }
                      }}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <InputBox
              inputRegister={register("score")}
              label="Score %"
              htmlFor="score"
              inputType="text"
              inputMode="numeric"
              required
              error={
                errors.score && (
                  <p className="text-red-500">{errors.score.message}</p>
                )
              }
            />
            <button
              type="submit"
              className={`w-full p-3 text-white transition duration-150 ${
                isSubmitting
                  ? "bg-gray-200"
                  : "bg-primary transition duration-150"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="second-loader" />
              ) : (
                <p>Update applicant details</p>
              )}
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default EditApplicantCard;
