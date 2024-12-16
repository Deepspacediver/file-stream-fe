import logoSrc from "@/assets/icons/file-stream-logo.webp";
import CustomNavlink from "@components/custom-navlink";
import clsx from "clsx";
import { FolderTree } from "@/types/node-types";
import FolderTreeWrapper from "./folder-tree-wrapper";
import { useParams } from "react-router-dom";

type MenuProps = {
  className?: string;
  folderTree?: FolderTree;
  sharedFolderTree?: FolderTree;
};

export default function DesktopMenu({
  className,
  folderTree,
  sharedFolderTree,
}: MenuProps) {
  const { hash } = useParams();
  return (
    <aside
      className={clsx(
        "text-col-white bg-gradient-vertical hidden lg:block w-full max-w-80",
        className
      )}
    >
      <div className="flex mx-auto p-5 w-full items-center  gap-2">
        <div>
          <img className="w-10" src={logoSrc} alt="file stream folder" />
        </div>
        <CustomNavlink to="/" className="no-underline">
          <h1 className="text-4xl font-medium">FileStream</h1>
        </CustomNavlink>
      </div>
      {folderTree && <FolderTreeWrapper folderTree={folderTree} />}
      {sharedFolderTree && (
        <FolderTreeWrapper folderTree={sharedFolderTree} hash={hash} />
      )}
    </aside>
  );
}
