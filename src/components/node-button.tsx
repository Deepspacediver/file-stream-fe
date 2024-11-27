import AddFolderIcon from "@/assets/icons/folder-add.svg?react";
import Button from "./button";
import { twMerge } from "tailwind-merge";
import CreateNodeModal from "./create-node-modal";
import { useRef } from "react";

export default function NodeButton() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const mobileStyles =
    "absolute inset-y-[85%] inset-x-[95%] rounded-3xl p-5 w-20 h-20";
  const desktopStyles = "lg:static lg:rounded-xl lg:p-2 lg:h-14";
  return (
    <>
      <Button
        className={twMerge(
          "ml-auto min-w-fit w-15 h-16 flex text-sm items-center gap-1 font-semibold bg-col-purple-light text-col-white",
          mobileStyles,
          desktopStyles
        )}
        onClick={() => {
          openModal();
        }}
      >
        <AddFolderIcon className="w-10 h-10 lg:w-8 lg:h-8" />
        <span className="hidden lg:inline-block">Add Resource</span>
      </Button>
      <CreateNodeModal ref={modalRef} closeModal={closeModal} />
    </>
  );
}
