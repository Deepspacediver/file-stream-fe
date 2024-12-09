import clsx from "clsx";
import { forwardRef, ReactNode } from "react";
import Button from "./button";
import CloseIcon from "@/assets/icons/close-icon.svg?react";

type ModalProps = {
  id: string;
  onClose?: () => void;
  closeModal: () => void;
  className?: string;
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { className, onClose, children, closeModal, id },
  ref
) {
  return (
    <dialog
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      id={id}
      className={clsx(
        `rounded-xl text-col-white bg-gradient-vertical backdrop:bg-black/50 
    backdrop:backdrop-blur-md m-auto px-5 py-4 sm:py-8 sm:px-9 w-10/12 max-w-2xl`,
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
      </div>
      {children}
    </dialog>
  );
});
