import { NodeTypes } from "@/types/node-types";
import { SelectOption } from "@/types/option-types";

export const CreateNodeOptions: SelectOption[] = [
  {
    id: NodeTypes.FOLDER,
    name: "Folder",
  },
  { id: NodeTypes.FILE, name: "File" },
];
