import { CONTAINS_WHITE_SPACE_REGEX } from "@/constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/input";
import { BaseSyntheticEvent, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button";
import Select from "./select";
import { UserContext } from "@/contexts/user-context";
import { useCreateFolder, useUpdateNode } from "@/api/queries/users-queries";
import {
  CreateFolder,
  EditNodeCell,
  FolderOption,
  NodeTypes,
} from "@/types/node-types";
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
  folderOptions: FolderOption[];
  defaultFolderOption: FolderOption | null;
  editedNode?: EditNodeCell | null;
  onMutation?: () => void;
};

export default function FolderForm({
  folderOptions,
  defaultFolderOption,
  editedNode,
  onMutation,
}: FolderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateFolderForm>({
    mode: "all",
    resolver: zodResolver(CreateFolderSchema),
    values: {
      name: editedNode?.name ?? "",
      parentNodeId:
        editedNode?.parentNodeId ??
        defaultFolderOption?.id ??
        folderOptions[0].id,
    },
  });
  const { user } = useContext(UserContext);
  const userId = user!.userId;
  const { createNewFolder, isLoading } = useCreateFolder(userId, onMutation);
  const { updateNodeData } = useUpdateNode(userId, onMutation);

  const isEditMode = !!editedNode;

  const curatedFolderOptions = !isEditMode
    ? folderOptions
    : folderOptions.filter(({ id }) => id !== editedNode.nodeId);

  const onSubmit = (data: CreateFolderForm, e?: BaseSyntheticEvent) => {
    if (isEditMode) {
      updateNodeData({
        name: data.name,
        parentNodeId: data.parentNodeId,
        userId,
        nodeId: editedNode.nodeId,
      });
      return;
    }

    e?.preventDefault();
    const dataToSend: CreateFolder = {
      ...data,
      type: NodeTypes.FOLDER,
      userId,
    };
    createNewFolder(dataToSend);
  };
  const headerText = isEditMode ? "Edit folder" : "Create new folder";

  return (
    <form
      className="transparent-background flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium">{headerText}</h2>
      <Input error={errors["name"]} label="Name" {...register("name")} />
      <Select
        label="Parent folder"
        options={curatedFolderOptions}
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
