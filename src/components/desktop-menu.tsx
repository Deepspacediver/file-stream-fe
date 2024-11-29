import logoSrc from "@/assets/icons/file-stream-logo.webp";
import CustomNavlink from "@components/custom-navlink";
import clsx from "clsx";
import FolderMenuTree from "@components/folder-menu-tree";
import { FolderTree } from "@/types/node-types";

type MenuProps = {
  className?: string;
  folderTree?: FolderTree;
};

export default function DesktopMenu({ className, folderTree }: MenuProps) {
  return (
    <aside
      className={clsx(
        "bg-gradient-vertical hidden lg:block w-full max-w-80",
        className
      )}
    >
      <div className="flex mx-auto p-5 w-full items-center  gap-2">
        <div>
          <img className="w-10" src={logoSrc} alt="file stream folder" />
        </div>
        <CustomNavlink to="/" className="no-underline">
          <h1 className="text-4xl font-medium text-col-white">FileStream</h1>
        </CustomNavlink>
      </div>
      {folderTree && <FolderMenuTree folder={folderTree} />}
    </aside>
  );
}
