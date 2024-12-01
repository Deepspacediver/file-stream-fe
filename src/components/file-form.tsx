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
import { useCreateFile } from "@/api/queries/users-queries";
import { CreateFile, FolderOption, NodeTypes } from "@/types/node-types";
import { ButtonVariants } from "@/constants/button-variants";

const FILE_SIZE_LIMIT = 5242880;

const FileFormSchema = CreateFolderSchema.extend({
  file: z
    .instanceof(FileList, { message: "A file is in a wrong format" })
    .refine((val) => !!val[0], { message: "A file is required" })
    .refine((val) => val[0] && val[0].size <= FILE_SIZE_LIMIT, {
      message: "File cannot exceed size of 5 mb ",
    }),
});
type FileFormFields = z.infer<typeof FileFormSchema>;

type FileFormProps = {
  folderOptions: FolderOption[];
};

export default function FileForm({ folderOptions }: FileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FileFormFields>({
    mode: "all",
    resolver: zodResolver(FileFormSchema),
    defaultValues: {
      name: "",
      parentNodeId: folderOptions[0].id!,
    },
  });
  const { user } = useContext(UserContext);
  const userId = user!.userId;
  const { createNewFile, isLoading } = useCreateFile(userId);

  const onSubmit = (data: FileFormFields, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    const file = data.file[0];
    const dataToSend = {
      ...data,
      file,
      type: NodeTypes.FILE,
      userId,
    } as CreateFile;
    createNewFile(dataToSend);
  };

  return (
    <form
      className="transparent-background flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium">Create new file</h2>
      <Input error={errors["name"]} label="Name" {...register("name")} />
      <Select
        label="Parent folder"
        {...register("parentNodeId")}
        options={folderOptions}
      />
      <FileInput
        error={errors["file"] as FieldError}
        {...register("file")}
        label="File"
      />
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
