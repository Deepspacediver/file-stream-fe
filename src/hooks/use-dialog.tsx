import { RefObject } from "react";

type useDialogProps = {
  dialogRef: RefObject<HTMLDialogElement>;
};

export default function useDialog({ dialogRef }: useDialogProps) {
  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return {
    openModal,
    closeModal,
  };
}
