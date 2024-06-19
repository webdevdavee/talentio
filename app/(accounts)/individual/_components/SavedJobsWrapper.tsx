"use client";

import { useEffect, useState } from "react";
import TableUtitlity from "./TableUtitlity";
import SavedJobsTable from "./SavedJobsTable";
import Pagination from "../../../../components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import {
  deleteSavedJobs,
  getUserSavedJobs,
} from "@/database/actions/savedjobs.actions";
import DeletePopup from "../../../../components/DeletePopup";
import { getJobById } from "@/database/actions/job.actions";
import { createURL } from "@/lib/utils";

type SavedJobsWrapperProps = {
  userId: string | undefined;
  page: number;
  perPage: number;
};

const SavedJobsWrapper = ({ userId, page, perPage }: SavedJobsWrapperProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = new URLSearchParams(searchParams.toString());

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [isLoading, setIsLoading] = useState(true);
  const [checkedJobs, setCheckedJobs] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [singleJobToBeDeleted, setSingleJobToBeDeleted] = useState<string>();
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      // Fetch the user's saved jobs
      const getSavedJobs = await getUserSavedJobs(userId, page, perPage);
      setTotalPages(getSavedJobs?.totalPages);
      // Fetch the full job details for each saved job
      const jobsDetails: Job[] = await Promise.all(
        getSavedJobs?.jobs.map((job: UserSavedJobs) => getJobById(job.jobId))
      );
      setJobs(jobsDetails);
      setIsLoading(false);
    };
    fetchSavedJobs();
  }, [page, perPage, refetchData]);

  // Create a new array (newCheckedJobs) off of checkedItems
  useEffect(() => {
    const newCheckedJobs = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedJobs(newCheckedJobs);
  }, [checkedItems]);

  // Create an array based on the search input
  const filteredJobSearch = jobs?.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.type.toLowerCase().includes(query.toLowerCase()) ||
      job.level.toLowerCase().includes(query.toLowerCase())
  );

  // Delete saved job(s) function
  const deleteSavedJob = async () => {
    // Prevent unnecessary state updates if refetchData is already false
    if (refetchData) setRefetchData(false);

    // Prepare the job(s) to be deleted
    const jobsToDelete = singleJobToBeDeleted
      ? [{ id: singleJobToBeDeleted }]
      : checkedJobs;

    // Close the delete modal and remove overlay
    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    // Perform the delete operation
    if (jobsToDelete.length > 0) {
      await deleteSavedJobs(jobsToDelete, pathname);
      setSingleJobToBeDeleted(undefined);
    }

    // Adjust pagination if necessary
    if (
      jobs &&
      page === totalPages &&
      (jobs.length <= 1 || jobsToDelete.length === jobs.length)
    ) {
      totalPages - 1;
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

  return (
    <section className="flex flex-col gap-6 mb-6">
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteData={deleteSavedJob}
      />
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total saved jobs:"
        filteredSearch={filteredJobSearch}
        perPage={perPage}
        deleteBtnText="Delete job(s)"
        deleteFunction={deleteSavedJob}
        searchPlaceholder="Search saved jobs"
      />
      <SavedJobsTable
        jobs={filteredJobSearch}
        setJobs={setJobs}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setShowDeleteModal={setShowDeleteModal}
        setSingleJobToBeDeleted={setSingleJobToBeDeleted}
        isLoading={isLoading}
      />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default SavedJobsWrapper;
