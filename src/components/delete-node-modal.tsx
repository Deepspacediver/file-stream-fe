import { forwardRef, useContext } from "react";
import Modal from "./modal";
import Button from "./button";
import { UserContext } from "@/contexts/user-context";
import { useDeleteNode } from "@/api/queries/users-queries";
import { ButtonVariants } from "@/constants/button-variants";
import { useNavigate } from "react-router-dom";

type DeleteNodeModalProps = {
  onClose?: () => void;
  closeModal: () => void;
  nodeToBeDeleted: {
    nodeId: number;
    isDeletingFromItsView: boolean;
  } | null;
};

const DeleteNodeModal = forwardRef<HTMLDialogElement, DeleteNodeModalProps>(
  function DeleteNodeModal({ onClose, closeModal, nodeToBeDeleted }, ref) {
    const { user } = useContext(UserContext);
    const userId = user?.userId;
    const navigate = useNavigate();
    const nodeId = nodeToBeDeleted?.nodeId;
    const onSuccessfulDeletion = () => {
      if (nodeToBeDeleted?.isDeletingFromItsView) {
        navigate("/");
        return;
      }
      closeModal();
    };
    const { removeNode } = useDeleteNode(userId, onSuccessfulDeletion);
    return (
      <Modal
        id="delete-node-modal"
        closeModal={closeModal}
        onClose={onClose}
        ref={ref}
      >
        {nodeId ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium">
              Are you sure you want to delete this resource?
            </h3>
            <Button
              variant={ButtonVariants.SUBMIT}
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
