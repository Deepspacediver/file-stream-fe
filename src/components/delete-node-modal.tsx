import { forwardRef, useContext } from "react";
import Modal from "./modal";
import Button from "./button";
import { UserContext } from "@/contexts/user-context";
import { useDeleteNode } from "@/api/queries/users-queries";

type DeleteNodeModalProps = {
  onClose?: () => void;
  closeModal: () => void;
  nodeId: number | null;
};

const DeleteNodeModal = forwardRef<HTMLDialogElement, DeleteNodeModalProps>(
  function DeleteNodeModal({ onClose, closeModal, nodeId }, ref) {
    const { user } = useContext(UserContext);
    const userId = user?.userId;
    const { removeNode } = useDeleteNode(userId, closeModal);
    return (
      <Modal
        id="delete-node-modal"
        closeModal={closeModal}
        onClose={onClose}
        ref={ref}
      >
        {nodeId ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl">
              Are you sure you want to delete this resource?
            </h3>
            <Button
              onClick={() => {
                if (userId) {
                  removeNode({ userId, nodeId });
                }
              }}
              className="mx-auto"
            >
              Delete
            </Button>
          </div>
        ) : (
          <div>First choose resource to delete</div>
        )}
      </Modal>
    );
  }
);

export default DeleteNodeModal;
