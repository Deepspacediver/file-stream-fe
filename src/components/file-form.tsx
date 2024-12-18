import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/input";
import { BaseSyntheticEvent, useContext } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button";
import Select from "./select";
import { CreateFolderSchema } from "./folder-form";
import FileInput from "./file-input";
import { UserContext } from "@/contexts/user-context";
import { useCreateFile, useUpdateNode } from "@/api/queries/users-queries";
import {
  CreateFile,
  EditNodeCell,
  FolderOption,
  NodeTypes,
} from "@/types/node-types";
import { ButtonVariants } from "@/constants/button-variants";

const FILE_SIZE_LIMIT = 5242880;

const FileFormSchema = CreateFolderSchema.extend({
  file: z
    .instanceof(FileList, { message: "A file is in a wrong format" })
    .refine((val) => !!val[0], { message: "A file is required" })
    .refine((val) => val[0] && val[0].size <= FILE_SIZE_LIMIT, {
      message: "File cannot exceed size of 5 mb ",
    })
    .optional(),
});
type FileFormFields = z.infer<typeof FileFormSchema>;

type FileFormProps = {
  folderOptions: FolderOption[];
  defaultFolderOption: FolderOption | null;
  editedNode?: EditNodeCell | null;
  onMutation?: () => void;
};

export default function FileForm({
  folderOptions,
  defaultFolderOption,
  editedNode,
  onMutation,
}: FileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FileFormFields>({
    mode: "all",
    resolver: zodResolver(FileFormSchema),
    values: {
      parentNodeId:
        editedNode?.parentNodeId ??
        defaultFolderOption?.id ??
        folderOptions[0].id,
      name: editedNode?.name ?? "",
    },
  });
  const { user } = useContext(UserContext);
  const userId = user!.userId;
  const { createNewFile, isLoading } = useCreateFile(userId, onMutation);
  const { updateNodeData } = useUpdateNode(userId, onMutation);

  const onSubmit = (data: FileFormFields, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    if (editedNode) {
      updateNodeData({
        name: data.name,
        parentNodeId: data.parentNodeId,
        userId,
        nodeId: editedNode.nodeId,
      });
      return;
    }
    if (!data.file) {
      return;
    }
    const file = data.file[0];
    const dataToSend = {
      ...data,
      file,
      type: NodeTypes.FILE,
      userId,
    } as CreateFile;
    createNewFile(dataToSend);
  };

  const isEditMode = !!editedNode;
  const headerText = isEditMode ? "Edit file" : "Create new file";

  return (
    <form
      className="transparent-background flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium">{headerText}</h2>
      <Input error={errors["name"]} label="Name" {...register("name")} />
      <Select
        label="Parent folder"
        {...register("parentNodeId")}
        options={folderOptions}
      />
      {!editedNode && (
        <FileInput
          error={errors["file"] as FieldError}
          {...register("file")}
          label="File"
        />
      )}
      <Button
        isLoading={isLoading || isLoading}
        disabled={!isValid}
        className="mx-auto"
        variant={ButtonVariants.SUBMIT}
      >
        Submit
      </Button>
    </form>
  );
}
