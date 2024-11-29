import { FolderTree } from "@/types/node-types";
import FolderIcon from "@/assets/icons/folder-white-outline.svg?react";
import DropdownIcon from "@/assets/icons/chevron-down.svg?react";
import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
type FolderMenuItemProps = {
  folder: FolderTree;
};

export default function FolderMenuTree({ folder }: FolderMenuItemProps) {
  const [areChildrenOpen, setAreChildrenOpen] = useState(false);

  const toggleChildrenOpen = () => {
    setAreChildrenOpen((prevState) => !prevState);
  };

  return (
    <div className="text-col-white overflow-y-hidden">
      <div
        onDoubleClick={toggleChildrenOpen}
        className="flex items-center gap-2 px-1 w-fit rounded-md hover:bg-col-white-transparent hover:cursor-pointer"
      >
        <span className="flex items-center gap-1">
          <FolderIcon className="w-8 h-8" />
          {folder.name}
        </span>
        <DropdownIcon
          onClick={toggleChildrenOpen}
          className={clsx(
            " w-4 h-4 rotate-0 transition-all ",
            areChildrenOpen && "rotate-180"
          )}
        />
      </div>
      {!!folder.children && (
        <div
          className={twMerge(
            clsx(
              "grid grid-rows-none transition-[grid-template-rows] overflow-y-hidden",
              areChildrenOpen && "grid-rows-fr"
            )
          )}
        >
          <div className="overflow-hidden  pl-4">
            {folder.children.map((subFolder) => {
              return (
                <FolderMenuTree key={subFolder.nodeId} folder={subFolder} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
