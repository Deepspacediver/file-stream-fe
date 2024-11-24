import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/input";
import { BaseSyntheticEvent } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button";
import Select from "./select";
import { CreateFolderSchema } from "./folder-form";
import FileInput from "./file-input";
import { SelectOption } from "@/types/option-types";

const FILE_SIZE_LIMIT = 5242880;

const CreateFileSchema = CreateFolderSchema.extend({
  file: z
    .custom((file) => file instanceof FileList && file.length === 1, {
      message: "File is missing",
    })
    .refine((val) => (val as FileList)[0].size <= FILE_SIZE_LIMIT, {
      message: "File cannot exceed size of 5 mb ",
    }),
});
type CreateFile = z.infer<typeof CreateFileSchema>;

type FileFormProps = {
  folderOptions: SelectOption[];
};

export default function FileForm({ folderOptions }: FileFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateFile>({
    mode: "all",
    resolver: zodResolver(CreateFileSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: CreateFile, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);
  };

  console.log(watch("file"));

  return (
    <form
      className="transparent-background flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium">Create new file</h2>
      <Input error={errors["name"]} label="Name" {...register("name")} />
      <Select
        label="Parent folder"
        {...register("parentFolderId")}
        options={folderOptions}
      />
      <FileInput
        error={errors["file"] as FieldError}
        {...register("file")}
        label="Upload file"
      />
      <Button className="mx-auto">Submit</Button>
    </form>
  );
}
