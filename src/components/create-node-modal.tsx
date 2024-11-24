import { forwardRef, useState } from "react";
import Button from "@components/button";
import CloseIcon from "@/assets/icons/close-icon.svg?react";
import clsx from "clsx";
import Select from "@components/select";
import { CreateNodeOptions } from "@/constants/select-options";
import { NodeTypes } from "@/types/node-types";
import FolderForm from "@components/folder-form";
import FileForm from "@components/file-form";

type CreateNodeModalProps = { className?: string; closeModal: () => void };

const CreateNodeModal = forwardRef<HTMLDialogElement, CreateNodeModalProps>(
  function CreatNodeModal({ className, closeModal }, ref) {
    const [resourceType, setResourceType] = useState<NodeTypes>(
      NodeTypes.FOLDER
    );
    const isFolderResource = resourceType === NodeTypes.FOLDER;

    return (
      <dialog
        id="modal"
        className={clsx(
          `rounded-xl text-col-white bg-gradient-vertical backdrop:bg-black/50 
          backdrop:backdrop-blur-md m-auto px-9 py-5 w-10/12 max-w-xl`,
          className
        )}
        ref={ref}
      >
        <div className="flex flex-col">
          <Button
            className="ml-auto min-w-fit bg-transparent"
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon className="w-6 h-6 text-col-white " />
          </Button>
          <Select
            wrapperClassName="mb-5"
            labelClassName="text-2xl font-medium inline-block mb-3"
            label="Type of resource:"
            options={CreateNodeOptions}
            onChange={(e) => {
              setResourceType(e.currentTarget.value as NodeTypes);
            }}
          />
        </div>
        {isFolderResource ? <FolderForm /> : <FileForm />}
      </dialog>
    );
  }
);

export default CreateNodeModal;
