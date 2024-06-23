"use client";

import { useEffect, useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import TableUtitlity from "./TableUtitlity";
import Pagination from "../../../../components/ui/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeletePopup from "../../../../components/ui/DeletePopup";
import {
  deleteApplication,
  getUserApplicationById,
  getUserApplications,
} from "@/database/actions/applications.actions";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { getJobById } from "@/database/actions/job.actions";
import SeeApplication from "./SeeApplication";
import { createURL } from "@/lib/utils";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = new URLSearchParams(searchParams.toString());

  const [query, setQuery] = useState("");
  const [applications, setApplications] = useState<UserApplication[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [isLoading, setIsLoading] = useState(true);
  const [applicationToShow, setApplicationToShow] = useState<UserApplication>();
  const [checkedApplications, setCheckedApplication] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMyApplication, setShowMyApplication] = useState(false);
  const [singleApplicationToBeDeleted, setSingleApplicationToBeDeleted] =
    useState<string>();
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      // Fetch the user's applications
      const getApplications = await getUserApplications(userId, page, perPage);

      setTotalPages(getApplications?.totalPages);

      // Fetch the applications details
      const applicationsDetails: UserApplication[] = await Promise.all(
        getApplications?.applications.map(
          async (application: UserApplication) => {
            const job: Job = await getJobById(application.jobId);
            return {
              ...application,
              job: job,
            };
          }
        )
      );
      setApplications(applicationsDetails);
      setIsLoading(false);
    };
    fetchApplications();
  }, [page, perPage, refetchData]);

  // Create a new array (newCheckedApplications) off of checkedItems
  useEffect(() => {
    const newCheckedApplications = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedApplication(newCheckedApplications);
  }, [checkedItems]);

  // Create an array based on the search input
  const filteredApplicationsSearch = applications?.filter(
    (application) =>
      application.job.title.toLowerCase().includes(query.toLowerCase()) ||
      application.job.company.toLowerCase().includes(query.toLowerCase())
  );

  // Function to delete applications
  const deleteApplications = async () => {
    // Prevent unnecessary state updates if refetchData is already false
    if (refetchData) setRefetchData(false);

    // Prepare the application(s) to be deleted
    const applicationsToDelete = singleApplicationToBeDeleted
      ? [{ id: singleApplicationToBeDeleted }]
      : checkedApplications;

    // Close the delete modal and remove overlay
    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });

    // Perform the delete operation
    if (applicationsToDelete.length > 0) {
      await deleteApplication(applicationsToDelete, pathname);
      setSingleApplicationToBeDeleted(undefined);
    }

    // Adjust pagination if necessary
    if (
      applications &&
      page === totalPages &&
      (applications.length <= 1 ||
        applicationsToDelete.length === applications.length)
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

  // Get the application to display on modal from the applicationId
  const handleShowApplication = async (applicationId: string) => {
    const application = await getUserApplicationById(applicationId);
    if (application) {
      setApplicationToShow(application);
      setShowMyApplication(true);
      useOverlayStore.setState({ overlay: true });
    }
  };

  return (
    <section className="flex flex-col gap-6 mb-6">
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteData={deleteApplications}
      />
      <SeeApplication
        applicationToShow={applicationToShow}
        showMyApplication={showMyApplication}
        setShowMyApplication={setShowMyApplication}
      />
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total applications:"
        filteredSearch={filteredApplicationsSearch}
        perPage={perPage}
        deleteBtnText="Delete application(s)"
        deleteFunction={deleteApplications}
        searchPlaceholder="Search applications"
      />
      <ApplicationsTable
        applications={filteredApplicationsSearch}
        setApplications={setApplications}
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
