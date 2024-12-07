import { useGetFolderContent } from "@/api/queries/users-queries";
import FolderTable from "@/components/folder-table";
import Loader from "@/components/loader";
import { UserContext } from "@/contexts/user-context";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TrashBin from "@/assets/icons/trash-can.svg?react";
import EditPen from "@/assets/icons/edit-pen.svg?react";
import ShareIcon from "@/assets/icons/share-icon.svg?react";
import DeleteNodeModal from "@/components/delete-node-modal";
import CreateNodeModal from "@/components/create-node-modal";
import { EditNodeCell, NodeTypes } from "@/types/node-types";
import useDialog from "@/hooks/use-dialog";

export default function FolderView() {
  const [editedNode, setEditedNode] = useState<EditNodeCell | null>(null);
  const [nodeIdToBeDeleted, setNodeIdToBeDeleted] = useState<number | null>(
    null
  );
  const params = useParams();
  const { folderId } = params;
  const { user } = useContext(UserContext);
  const userId = user ? +user.userId : null;
  const nodeId = folderId ? +folderId : null;

  const nodeModalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const { openModal: openNodeModal, closeModal: closeNodeModal } = useDialog({
    dialogRef: nodeModalRef,
  });
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } =
    useDialog({
      dialogRef: deleteModalRef,
    });

  const { folderWithContent, isLoading } = useGetFolderContent({
    userId,
    nodeId,
  });

  const currentFolder: EditNodeCell | null =
    nodeId && folderWithContent && !!folderWithContent.parentNodeId
      ? {
          nodeId,
          parentNodeId: folderWithContent.parentNodeId,
          type: NodeTypes.FOLDER,
          name: folderWithContent.name,
        }
      : null;

  if (isLoading) {
    return <Loader isCentered />;
  }
  const iconStyles = "min-w-6 min-h-6 h-6 w-6 cursor-pointer";

  return (
    <div className="p-2 my-3">
      <DeleteNodeModal
        key={"delete-node-modal"}
        closeModal={closeDeleteModal}
        ref={deleteModalRef}
        nodeId={nodeIdToBeDeleted}
        onClose={() => setNodeIdToBeDeleted(null)}
      />
      <CreateNodeModal
        key={"create-node-modal"}
        editedNode={editedNode}
        ref={nodeModalRef}
        closeModal={closeNodeModal}
        onClose={() => {
          setEditedNode(null);
        }}
      />
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-medium">{folderWithContent?.name}</h2>
        <div className="flex gap-2">
          {currentFolder && (
            <>
              <EditPen
                className={iconStyles}
                onClick={() => {
                  openNodeModal();
                  setEditedNode(currentFolder);
                }}
              />
              <TrashBin
                className={iconStyles}
                onClick={() => {
                  setNodeIdToBeDeleted(currentFolder.nodeId);
                  openDeleteModal();
                }}
              />
            </>
          )}
          <ShareIcon className={iconStyles} />
        </div>
      </div>
      {folderWithContent?.content.length && nodeId ? (
        <FolderTable
          setEditedNode={setEditedNode}
          openNodeModal={openNodeModal}
          setNodeIdToBeDeleted={setNodeIdToBeDeleted}
          openDeleteModal={openDeleteModal}
          folderContent={folderWithContent.content}
        />
      ) : (
        <p className="mt-2 text-xl">Folder is empty</p>
      )}
    </div>
  );
}
