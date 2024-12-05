import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

type ModalProps = {
  onClose?: () => void;
  className?: string;
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { className, onClose, children },
  ref
) {
  return (
    <dialog
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      id="modal"
      className={clsx(
        `rounded-xl text-col-white bg-gradient-vertical backdrop:bg-black/50 
    backdrop:backdrop-blur-md m-auto px-5 py-4 sm:py-8 sm:px-9 w-10/12 max-w-xl`,
        className
      )}
      ref={ref}
    >
      {children}
    </dialog>
  );
});
