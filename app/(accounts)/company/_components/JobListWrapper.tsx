"use client";

import DeletePopup from "@/components/DeletePopup";
import { deleteJobs, getJobsByCompanyId } from "@/database/actions/job.actions";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableUtitlity from "../../individual/_components/TableUtitlity";
import Pagination from "@/components/Pagination";
import JobsTable from "./JobsTable";

type JobListWrapperProps = {
  company: Company;
  page: number;
  perPage: number;
};

const JobListWrapper = ({ company, page, perPage }: JobListWrapperProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = new URLSearchParams(searchParams.toString());

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[] | undefined>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [checkedJobs, setCheckedJobs] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [singleJobToBeDeleted, setSingleJobToBeDeleted] = useState<string>();
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      // Fetch the company's jobs list
      const applicants: GetJob2 | undefined = await getJobsByCompanyId(
        company.userId,
        page,
        perPage
      );

      setJobs(applicants?.jobs);
      setTotalPages(applicants?.totalPages);
      setIsLoading(false);
    };
    fetchJobs();
  }, [page, perPage, company.userId, refetchData]);

  // Create a new array (newCheckedJobs) off of checkedItems
  useEffect(() => {
    const newCheckedJobs = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedJobs(newCheckedJobs);
  }, [checkedItems]);

  // Create an array based on the search input
  const filteredJobsSearch = jobs?.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.type.toLowerCase().includes(query.toLowerCase()) ||
      job.level.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
  );

  // Function to delete jobs
  const deleteCompanyJobs = async () => {
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
      await deleteJobs(jobsToDelete, pathname);
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
        deleteData={deleteCompanyJobs}
      />
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total jobs:"
        filteredSearch={filteredJobsSearch}
        perPage={perPage}
        deleteBtnText="Delete job(s)"
        deleteFunction={deleteCompanyJobs}
        searchPlaceholder="Search jobs"
      />
      <JobsTable
        jobs={filteredJobsSearch}
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

export default JobListWrapper;
