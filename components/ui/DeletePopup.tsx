import useClickOutside from "@/hooks/useClickOutside";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { useRef } from "react";

type DeletePopupProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteData: () => Promise<void>;
};

const DeletePopup = ({
  showDeleteModal,
  setShowDeleteModal,
  deleteData,
}: DeletePopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside profile dialog
  useClickOutside(popupRef, () => {
    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });
  });

  const cancelDeleteProduct = () => {
    setShowDeleteModal(false);
    useOverlayStore.setState({ overlay: false });
  };

  return (
    <>
      {showDeleteModal && (
        <section
          ref={popupRef}
          className="modal z-[36] border-[1px] border-gray-300 p-6 bg-white m:w-[90%]"
        >
          <p className="mb-8">
            This action is irreversible. Do you want to proceed?
          </p>
          <div className="flex gap-3 items-center justify-center">
            <button
              type="button"
              className="border-[1px] border-gray-300 py-2 px-4 text-[#272829]"
              onClick={cancelDeleteProduct}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-primary py-2 px-4 text-white"
              onClick={deleteData}
            >
              Delete
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default DeletePopup;
