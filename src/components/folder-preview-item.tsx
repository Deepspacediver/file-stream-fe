import { UserFolderResponse } from "@/types/node-types";
import CustomNavlink from "./custom-navlink";
import FolderIcon from "@/assets/icons/folder-white-outline.svg?react";
import Button from "./button";

type FolderPreviewItemProps = {
  folder: UserFolderResponse;
};

export default function FolderPreviewItem({ folder }: FolderPreviewItemProps) {
  const { nodeId, name } = folder;
  return (
    <CustomNavlink
      className="no-underline w-fit m-auto"
      to={`folders/${nodeId}`}
    >
      <Button className="p-0 min-w-fit">
        <div
          className={`flex flex-col items-center justify-center shadow-2xl text-lg font-medium bg-gradient-vertical
          p-2 w-28 h-28 xsm:w-36 xsm:h-36 md:w-40 md:h-40 
          text-col-white rounded-xl`}
        >
          <FolderIcon className="w-16 h-16 sm:w-20 sm:h-20" />
          {name}
        </div>
      </Button>
    </CustomNavlink>
  );
}
