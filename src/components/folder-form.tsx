import { CONTAINS_WHITE_SPACE_REGEX } from "@/constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/input";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button";
import Select from "./select";
import { SelectOption } from "@/types/option-types";

export const CreateFolderSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name cannot be emptty" })
    .regex(CONTAINS_WHITE_SPACE_REGEX),
  parentFolderId: z.number({ message: "Parent folder is required" }),
});
type CreateFolder = z.infer<typeof CreateFolderSchema>;

type FolderFormProps = {
  folderOptions: SelectOption[];
};

export default function FolderForm({ folderOptions }: FolderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFolder>({
    mode: "all",
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: CreateFolder, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);
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
        {...register("parentFolderId")}
        options={folderOptions}
      />
      <Button className="mx-auto">Submit</Button>
    </form>
  );
}
