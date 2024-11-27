import { CONTAINS_WHITE_SPACE_REGEX } from "@/constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/input";
import { BaseSyntheticEvent, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button";
import Select from "./select";
import { SelectOption } from "@/types/option-types";
import { UserContext } from "@/contexts/user-context";
import { useCreateFolder } from "@/api/queries/users-queries";
import { CreateFolder, NodeTypes } from "@/types/node-types";
import { ButtonVariants } from "@/constants/button-variants";

export const CreateFolderSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .max(15, { message: "Name cannot exceed 15 characters" })
    .min(1, { message: "Name cannot be empty" })
    .regex(CONTAINS_WHITE_SPACE_REGEX),
  parentNodeId: z.coerce.number({ message: "Parent folder must be a number" }),
});
type CreateFolderForm = z.infer<typeof CreateFolderSchema>;

type FolderFormProps = {
  folderOptions: SelectOption[];
};

export default function FolderForm({ folderOptions }: FolderFormProps) {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<CreateFolderForm>({
    mode: "all",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: "",
      parentNodeId: folderOptions[0].id,
    },
  });
  const { user } = useContext(UserContext);
  const userId = user!.userId;
  const { createNewFolder, isLoading } = useCreateFolder(userId);

  const onSubmit = (data: CreateFolderForm, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    const dataToSend: CreateFolder = {
      ...data,
      type: NodeTypes.FOLDER,
      userId,
    };
    createNewFolder(dataToSend);
  };

  return (
    <form
      className="transparent-background flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium">Create new folder</h2>
      <Input error={errors["name"]} label="Name" {...register("name")} />
      <Select
        label="Parent folder"
        options={folderOptions}
        {...register("parentNodeId")}
        error={errors["parentNodeId"]}
      />
      <Button
        disabled={!isValid || isLoading}
        isLoading={isLoading}
        variant={ButtonVariants.SUBMIT}
        className="mx-auto"
      >
        Submit
      </Button>
    </form>
  );
}
