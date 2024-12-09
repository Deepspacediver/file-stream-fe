import { BaseSyntheticEvent, forwardRef, useContext } from "react";
import Modal from "./modal";
import { UserContext } from "@/contexts/user-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./button";
import FormError from "./form-error";
import { useCreateSharedNode } from "@/api/queries/shared-nodes-queries";
import { addDays } from "@/helpers/days-helpers";
import CopyText from "./copy-text";
import RadioButton from "./radio-button";
import { ButtonVariants } from "@/constants/button-variants";

const shareData: { label: string; days: string }[] = [
  {
    label: "1 DAY",
    days: "1",
  },
  {
    label: "3 DAYS",
    days: "3",
  },
  {
    label: "7 DAYS",
    days: "7",
  },
];

type ShareModalProps = {
  onClose?: () => void;
  closeModal: () => void;
  nodeId: number;
};

const ShareFormSchema = z.object({
  period: z.coerce.string({
    message: "Period of active share link is required",
  }),
});

type ShareForm = z.infer<typeof ShareFormSchema>;

const ShareModal = forwardRef<HTMLDialogElement, ShareModalProps>(
  function ShareModal({ nodeId, onClose, closeModal }, ref) {
    const { user } = useContext(UserContext);
    const userId = user?.userId;

    const {
      shareFolder,
      isLoading,
      isSuccess,
      response,
      reset: resetMutation,
    } = useCreateSharedNode();

    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
    } = useForm<ShareForm>({
      defaultValues: {
        period: shareData[0].days,
      },
      resolver: zodResolver(ShareFormSchema),
    });

    const onSubmit = (data: ShareForm, e?: BaseSyntheticEvent) => {
      e?.preventDefault();
      if (!userId) {
        return;
      }
      shareFolder({
        userId,
        nodeId,
        expiryDate: addDays(new Date(), +data.period),
      });
    };

    const onModalClose = () => {
      resetMutation();
      if (onClose) {
        onClose();
      }
    };

    const periodError = errors && errors["period"];
    return (
      <Modal
        id="share-node-modal"
        closeModal={closeModal}
        onClose={onModalClose}
        ref={ref}
      >
        <div>
          {response && isSuccess && (
            <>
              <h3 className="text-2xl font-medium mb-4">
                Your shareable folder link has been generated
              </h3>
              <CopyText
                copyText="Copy link"
                copyClassName="text-xl cursor-pointer"
                text={response.link}
              />
            </>
          )}
          {!response && !isSuccess && (
            <>
              <h3 className="text-2xl font-medium mb-6">
                Generate link to share folder and its content
              </h3>
              <form
                className="flex flex-col transparent-background"
                onSubmit={handleSubmit(onSubmit)}
              >
                <fieldset className="flex flex-wrap gap-2 md:gap-4 ">
                  <legend className="text-xl font-medium mb-1">
                    Choose period of days{" "}
                  </legend>
                  {shareData.map(({ label, days }) => {
                    return (
                      <RadioButton
                        key={days}
                        {...register("period")}
                        value={days}
                        label={label}
                        id={days}
                        checked={watch("period") === days}
                      />
                    );
                  })}
                  {periodError && <FormError error={periodError} />}
                </fieldset>
                <Button
                  variant={ButtonVariants.SUBMIT}
                  isLoading={isLoading}
                  className="mt-2 mx-auto"
                >
                  Submit
                </Button>
              </form>
            </>
          )}
        </div>
      </Modal>
    );
  }
);

export default ShareModal;
