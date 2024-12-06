import { forwardRef, useContext, useState } from "react";
import Select from "@components/select";
import { CreateNodeOptions } from "@/constants/select-options";
import { EditNodeCell, NodeTypes } from "@/types/node-types";
import FolderForm from "@components/folder-form";
import FileForm from "@components/file-form";
import { useGetUserFolders } from "@/api/queries/users-queries";
import { UserContext } from "@/contexts/user-context";
import { transformFolderToOptions } from "@/helpers/transform-options";
import { useParams } from "react-router-dom";
import Modal from "./modal";

type CreateNodeModalProps = {
  onClose?: () => void;
  closeModal: () => void;
  editedNode?: EditNodeCell | null;
};

const CreateNodeModal = forwardRef<HTMLDialogElement, CreateNodeModalProps>(
  function CreatNodeModal({ closeModal, onClose, editedNode }, ref) {
    const [resourceType, setResourceType] = useState<NodeTypes>(
      NodeTypes.FOLDER
    );

    const isEditMode = !!editedNode;
    const isFolderResource = isEditMode
      ? editedNode.type === NodeTypes.FOLDER
      : resourceType === NodeTypes.FOLDER;

    const { user } = useContext(UserContext);
    const { folders, isLoading } = useGetUserFolders(user?.userId);

    const folderOptions = transformFolderToOptions(folders ?? []);
    const { folderId } = useParams();
    const currentlyOpenFolder = folderId ? +folderId : null;
    //Needs to check if folderId is within fetched folders of logged user
    const defaultFolderOption = currentlyOpenFolder
      ? folderOptions.find(({ id }) => id === currentlyOpenFolder) ?? null
      : null;

    return (
      <Modal
        id="create-node-modal"
        ref={ref}
        closeModal={closeModal}
        onClose={onClose}
      >
        {!isEditMode && (
          <Select
            wrapperClassName="mb-5"
            labelClassName="text-2xl font-medium inline-block mb-3"
            label="Type of resource"
            options={CreateNodeOptions}
            onChange={(e) => {
              setResourceType(e.currentTarget.value as NodeTypes);
            }}
          />
        )}
        {isLoading && <div>Loading...</div>}
        {isFolderResource
          ? !isLoading && (
              <FolderForm
                editedNode={editedNode}
                folderOptions={folderOptions}
                defaultFolderOption={defaultFolderOption}
              />
            )
          : !isLoading && (
              <FileForm
                editedNode={editedNode}
                folderOptions={folderOptions}
                defaultFolderOption={defaultFolderOption}
              />
            )}
      </Modal>
    );
  }
);

export default CreateNodeModal;
