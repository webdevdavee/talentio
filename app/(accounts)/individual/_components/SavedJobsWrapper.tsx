"use client";

import { useEffect, useState } from "react";
import TableUtitlity from "./TableUtitlity";
import SavedJobsTable from "./SavedJobsTable";
import Pagination from "../../../../components/Pagination";
import { usePathname } from "next/navigation";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import {
  deleteSavedJobs,
  getUserSavedJobs,
} from "@/database/actions/savedjobs.actions";
import DeletePopup from "../../../../components/DeletePopup";
import Loader from "../../../../components/Loader";
import { getJobById } from "@/database/actions/job.actions";

type SavedJobsWrapperProps = {
  userId: string | undefined;
  page: number;
  perPage: number;
};

const SavedJobsWrapper = ({ userId, page, perPage }: SavedJobsWrapperProps) => {
  const pathname = usePathname();

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
  }, [page, perPage]);

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
    if (jobs && jobs.length <= 1) setIsLoading(true);

    // Ready the saved job(s) to be deleted
    const idToArray = singleJobToBeDeleted
      ? [{ id: singleJobToBeDeleted }]
      : [];

    if (checkedJobs.length > 0) {
      await deleteSavedJobs(checkedJobs, pathname);
    }

    if (idToArray.length > 0) {
      await deleteSavedJobs(idToArray, pathname);
    }

    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    if (jobs && jobs.length <= 1) setIsLoading(false);
    if (jobs && jobs.length > 1) window.location.reload();
  };

  return (
    <section className="flex flex-col gap-6">
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
