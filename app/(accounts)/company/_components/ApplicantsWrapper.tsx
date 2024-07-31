"use client";

import { useEffect, useState } from "react";
import TableUtitlity from "../../individual/_components/TableUtitlity";
import {
  deleteApplication,
  deleteNewCandidate,
  getApplicants,
  getUserApplicationById,
} from "@/database/actions/applications.actions";
import { getJobById } from "@/database/actions/job.actions";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeletePopup from "@/components/ui/DeletePopup";
import SeeApplication from "../../individual/_components/SeeApplication";
import Pagination from "@/components/ui/Pagination";
import ApplicantsTable from "./ApplicantsTable";
import { createURL } from "@/lib/utils";
import EditApplicantCard from "./EditApplicantCard";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = new URLSearchParams(searchParams.toString());

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
  const [singleApplicantToBeDeleted, setSingleApplicantToBeDeleted] =
    useState<string>();
  const [showEditApplicant, setShowEditApplicant] = useState(false);
  const [applicantToBeEdited, setApplicantToBeEdited] =
    useState<UserApplication>();
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      // Fetch the company's applicants
      const applicants = await getApplicants(company.userId, page, perPage);

      setTotalPages(applicants?.totalPages);

      // Fetch the applicants details for each application
      const applicantsDetails: UserApplication[] = await Promise.all(
        applicants?.applicants.map(async (application: UserApplication) => {
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
  }, [page, perPage, company.userId, refetchData]);

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

  // Function to delete applicants
  const deleteApplicants = async () => {
    // Prevent unnecessary state updates if refetchData is already false
    if (refetchData) setRefetchData(false);

    // Prepare the applicant(s) to be deleted
    const applicantsToDelete = singleApplicantToBeDeleted
      ? [{ id: singleApplicantToBeDeleted }]
      : checkedApplicants;

    // Close the delete modal and remove overlay
    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    // Perform the delete operation
    if (applicantsToDelete.length > 0) {
      await deleteApplication(applicantsToDelete, pathname);
      setSingleApplicantToBeDeleted(undefined);
    }

    // Adjust pagination if necessary
    if (
      applicants &&
      page === totalPages &&
      (applicants.length <= 1 ||
        applicantsToDelete.length === applicants.length)
    ) {
      setTotalPages((prev) => prev! - 1);
      const newPage = Math.max(page - 1, 1);
      pageParam.set("page", newPage.toString());

      // Update the URL with the new page number
      const url = createURL(pathname, pageParam);
      router.push(url);
    }

    // Refetch data and indicate loading is complete
    setRefetchData(true);
    setIsLoading(false);
  };

  // Get the application to display on modal from the applicantId
  const handleShowApplication = async (applicantId: string) => {
    setShowApplication(true);
    useOverlayStore.setState({ overlay: true });
    const application = await getUserApplicationById(applicantId);
    if (application) {
      // Delete application from the new candidate database collection.
      // The new candidates collection is used to hold the applications the company or hiring team has not yet reviewed
      await deleteNewCandidate(applicantId);
      setApplicationToShow(application);
    }
  };

  // Get the applicant to display on modal from the applicantId
  const handleShowEditApplicant = async (applicantId: string) => {
    setShowEditApplicant(true);
    useOverlayStore.setState({ overlay: true });
    const applicant = await getUserApplicationById(applicantId);
    if (applicant) {
      // Delete application from the new candidate database collection.
      await deleteNewCandidate(applicantId);
      setApplicantToBeEdited(applicant);
    }
  };

  return (
    <section className="flex flex-col gap-6 mb-6">
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
      <EditApplicantCard
        applicantToBeEdited={applicantToBeEdited}
        showEditApplicant={showEditApplicant}
        setShowEditApplicant={setShowEditApplicant}
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
        setSingleApplicantToBeDeleted={setSingleApplicantToBeDeleted}
        isLoading={isLoading}
        handleShowApplication={handleShowApplication}
        handleShowEditApplicant={handleShowEditApplicant}
      />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default ApplicantsWrapper;
