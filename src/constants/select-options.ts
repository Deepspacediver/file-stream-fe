import { SelectOption } from "@/types/option-types";
import { NodeTypes } from "@/types/node-types";

export const CreateNodeOptions: SelectOption[] = [
  {
    id: NodeTypes.FOLDER,
    name: "Folder",
  },
  { id: NodeTypes.FILE, name: "File" },
];
