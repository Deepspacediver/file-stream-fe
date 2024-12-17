import FolderTable from "@/components/folder-table";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TrashBin from "@/assets/icons/trash-can.svg?react";
import EditPen from "@/assets/icons/edit-pen.svg?react";
import ShareIcon from "@/assets/icons/share-icon.svg?react";
import DeleteNodeModal from "@/components/delete-node-modal";
import CreateNodeModal from "@/components/create-node-modal";
import {
  EditNodeCell,
  FolderContentResponse,
  NodeToBeDeleted,
  NodeTypes,
} from "@/types/node-types";
import useDialog from "@/hooks/use-dialog";
import ShareModal from "@/components/share-modal";

type FolderViewProps = {
  folderWithContent?: FolderContentResponse;
  hash?: string;
};

export default function FolderView({
  folderWithContent,
  hash,
}: FolderViewProps) {
  const [editedNode, setEditedNode] = useState<EditNodeCell | null>(null);
  const [nodeToBeDeleted, setNodeToBeDeleted] = useState<NodeToBeDeleted>(null);
  const { folderId } = useParams();
  const isShared = !!hash;
  const nodeId = folderId ? +folderId : folderWithContent?.nodeId ?? null;

  const nodeModalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const shareModalRef = useRef<HTMLDialogElement>(null);

  const { openModal: openNodeModal, closeModal: closeNodeModal } = useDialog({
    dialogRef: nodeModalRef,
  });
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } =
    useDialog({
      dialogRef: deleteModalRef,
    });

  const { openModal: openShareModal, closeModal: closeShareModal } = useDialog({
    dialogRef: shareModalRef,
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

  const iconStyles = "min-w-6 min-h-6 h-6 w-6 cursor-pointer";
  return (
    <div className="p-2 my-3">
      {!isShared && (
        <>
          <DeleteNodeModal
            key={"delete-node-modal"}
            closeModal={closeDeleteModal}
            ref={deleteModalRef}
            nodeToBeDeleted={nodeToBeDeleted}
            onClose={() => setNodeToBeDeleted(null)}
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
        </>
      )}
      {nodeId && !isShared && (
        <ShareModal
          closeModal={closeShareModal}
          nodeId={nodeId}
          ref={shareModalRef}
        />
      )}
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-medium">{folderWithContent?.name}</h2>
        <div className="flex gap-2">
          {currentFolder && !isShared && (
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
                  setNodeToBeDeleted({
                    nodeId: currentFolder.nodeId,
                    isDeletingFromItsView: true,
                  });
                  openDeleteModal();
                }}
              />
            </>
          )}
          {!isShared && (
            <ShareIcon
              className={iconStyles}
              onClick={() => {
                openShareModal();
              }}
            />
          )}
        </div>
      </div>
      {folderWithContent?.content.length && nodeId ? (
        <FolderTable
          hash={hash}
          setEditedNode={setEditedNode}
          openNodeModal={openNodeModal}
          setNodeToBeDeleted={setNodeToBeDeleted}
          openDeleteModal={openDeleteModal}
          folderContent={folderWithContent.content}
        />
      ) : (
        <p className="mt-2 text-xl">Folder is empty</p>
      )}
    </div>
  );
}
