import { FolderTree } from "@/types/node-types";
import FolderIcon from "@/assets/icons/folder-white-outline.svg?react";
import DropdownIcon from "@/assets/icons/chevron-down.svg?react";
import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
type FolderMenuItemProps = {
  folder: FolderTree;
};

export default function FolderMenuItem({ folder }: FolderMenuItemProps) {
  const [areChildrenOpen, setAreChildrenOpen] = useState(false);

  const toggleChildrenOpen = () => {
    setAreChildrenOpen((prevState) => !prevState);
  };

  return (
    <div className="text-col-white pl-3 overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 hover:cursor-pointer">
          <FolderIcon className="w-10 h-10" />
          {folder.name}
        </span>
        <DropdownIcon
          onClick={toggleChildrenOpen}
          className={clsx(
            "w-5 h-5 rotate-0 transition-all hover:cursor-pointer",
            areChildrenOpen && "rotate-180"
          )}
        />
      </div>
      {!!folder.children && (
        <div
          className={twMerge(
            clsx(
              "grid grid-rows-none transition-[grid-template-rows] overflow-hidden",
              areChildrenOpen && "grid-rows-fr"
            )
          )}
        >
          <div className="overflow-hidden">
            {folder.children.map((subFolder) => {
              return (
                <FolderMenuItem key={subFolder.nodeId} folder={subFolder} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
