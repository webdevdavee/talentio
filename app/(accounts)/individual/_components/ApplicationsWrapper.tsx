"use client";

import { useEffect, useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import TableUtitlity from "./TableUtitlity";
import Pagination from "../../../../components/Pagination";
import { usePathname, useRouter } from "next/navigation";
import DeletePopup from "../../../../components/DeletePopup";
import Loader from "../../../../components/Loader";
import {
  deleteApplication,
  getUserApplicationByJobId,
  getUserApplications,
} from "@/database/actions/applications.actions";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { getJobById } from "@/database/actions/job.actions";
import SeeMyApplication from "./SeeMyApplication";

type ApplicationsWrapperProps = {
  userId: string | undefined;
  page: number;
  perPage: number;
};

const ApplicationsWrapper = ({
  userId,
  page,
  perPage,
}: ApplicationsWrapperProps) => {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [isLoading, setIsLoading] = useState(true);
  const [applicationToShow, seApplicationToShow] = useState<UserApplication>();
  const [checkedApplications, setCheckedApplication] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMyApplication, setShowMyApplication] = useState(false);
  const [singleApplicationToBeDeleted, setSingleApplicationToBeDeleted] =
    useState<string>();

  useEffect(() => {
    const fetchApplications = async () => {
      // Fetch the user's applications
      const getApplications = await getUserApplications(userId, page, perPage);

      setTotalPages(getApplications?.totalPages);

      // Fetch the full job details for each application
      const jobsDetails: Job[] = await Promise.all(
        getApplications?.applications.map(
          async (application: UserApplication) => {
            const job = await getJobById(application.jobId);
            return {
              ...job,
              applicationDate: application.createdAt, // Add the application date to the job object
            };
          }
        )
      );
      setJobs(jobsDetails);
      setIsLoading(false);
    };
    fetchApplications();
  }, [page, perPage]);

  // Create a new array (newCheckedJobs) off of checkedItems
  useEffect(() => {
    const newCheckedJobs = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedApplication(newCheckedJobs);
  }, [checkedItems]);

  // Create an array based on the search input
  const filteredJobSearch = jobs?.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
  );

  // Delete appliaction(s) function
  const deleteApplications = async () => {
    if (jobs && jobs.length <= 1) setIsLoading(true);

    // Ready the application(s) to be deleted
    const idToArray = singleApplicationToBeDeleted
      ? [{ id: singleApplicationToBeDeleted }]
      : [];

    if (checkedApplications.length > 0) {
      await deleteApplication(checkedApplications, pathname);
    }

    if (idToArray.length > 0) {
      await deleteApplication(idToArray, pathname);
    }

    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    if (jobs && jobs.length <= 1) setIsLoading(false);
    if (jobs && jobs.length > 1) window.location.reload();
  };

  // Get the application to display on modal from the jobId
  const handleShowApplication = async (jobId: string) => {
    const application = await getUserApplicationByJobId(jobId);
    if (application) {
      seApplicationToShow(application);
      setShowMyApplication(true);
      useOverlayStore.setState({ overlay: true });
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteData={deleteApplications}
      />
      <SeeMyApplication
        applicationToShow={applicationToShow}
        showMyApplication={showMyApplication}
        setShowMyApplication={setShowMyApplication}
      />
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total applications:"
        filteredSearch={filteredJobSearch}
        perPage={perPage}
        deleteBtnText="Delete application(s)"
        deleteFunction={deleteApplications}
      />
      <ApplicationsTable
        jobs={filteredJobSearch}
        setJobs={setJobs}
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

export default ApplicationsWrapper;
