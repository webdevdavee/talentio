"use client";

import { useEffect, useState } from "react";
import TableUtitlity from "../../individual/_components/TableUtitlity";
import {
  deleteApplication,
  getApplicants,
  getUserApplicationById,
} from "@/database/actions/applications.actions";
import { getJobById } from "@/database/actions/job.actions";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { usePathname } from "next/navigation";
import DeletePopup from "@/components/DeletePopup";
import SeeApplication from "../../individual/_components/SeeApplication";
import Pagination from "@/components/Pagination";
import ApplicantsTable from "./ApplicantsTable";

type ApplicantsWrapperProps = {
  company: Company;
  page: number;
  perPage: number;
};

const ApplicantsWrapper = ({
  company,
  page,
  perPage,
}: ApplicantsWrapperProps) => {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [applicants, setApplicants] = useState<UserApplication[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [applicationToShow, setApplicationToShow] = useState<UserApplication>();
  const [checkedApplicants, setCheckedApplicants] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [singleApplicationToBeDeleted, setSingleApplicationToBeDeleted] =
    useState<string>();

  useEffect(() => {
    const fetchApplicants = async () => {
      // Fetch the company's applicants
      const theApplicant = await getApplicants(company.userId, page, perPage);

      setTotalPages(theApplicant?.totalPages);

      // Fetch the applicants details for each application
      const applicantsDetails: UserApplication[] = await Promise.all(
        theApplicant?.applicants.map(async (application: UserApplication) => {
          const job: Job = await getJobById(application.jobId);
          return {
            ...application,
            job: job,
          };
        })
      );
      setApplicants(applicantsDetails);
      setIsLoading(false);
    };
    fetchApplicants();
  }, [page, perPage]);

  // Create a new array (newCheckedApplicants) off of checkedItems
  useEffect(() => {
    const newCheckedApplicants = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedApplicants(newCheckedApplicants);
  }, [checkedItems]);

  // Create an array based on the search input
  const filteredApplicantsSearch = applicants?.filter(
    (applicant) =>
      applicant.job.title.toLowerCase().includes(query.toLowerCase()) ||
      applicant.stage.toLowerCase().includes(query.toLowerCase()) ||
      applicant.firstname.toLowerCase().includes(query.toLowerCase()) ||
      applicant.lastname.toLowerCase().includes(query.toLowerCase())
  );

  // Delete applicants(s) function
  const deleteApplicants = async () => {
    if (applicants && applicants.length <= 1) setIsLoading(true);

    // Ready the application(s) to be deleted
    const idToArray = singleApplicationToBeDeleted
      ? [{ id: singleApplicationToBeDeleted }]
      : [];

    if (checkedApplicants.length > 0) {
      await deleteApplication(checkedApplicants, pathname);
    }

    if (idToArray.length > 0) {
      await deleteApplication(idToArray, pathname);
    }

    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    location.reload();
  };

  // Get the application to display on modal from the jobId
  const handleShowApplication = async (applicantId: string) => {
    const application = await getUserApplicationById(applicantId);
    if (application) {
      setApplicationToShow(application);
      setShowApplication(true);
      useOverlayStore.setState({ overlay: true });
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteData={deleteApplicants}
      />
      <SeeApplication
        applicationToShow={applicationToShow}
        showMyApplication={showApplication}
        setShowMyApplication={setShowApplication}
      />
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total applicants:"
        filteredSearch={filteredApplicantsSearch}
        perPage={perPage}
        deleteBtnText="Delete applicant(s)"
        deleteFunction={deleteApplicants}
        searchPlaceholder="Search applicants"
      />
      <ApplicantsTable
        applicants={filteredApplicantsSearch}
        setApplicants={setApplicants}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setShowDeleteModal={setShowDeleteModal}
        setSingleApplicationToBeDeleted={setSingleApplicationToBeDeleted}
        isLoading={isLoading}
        handleShowApplication={handleShowApplication}
      />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default ApplicantsWrapper;
