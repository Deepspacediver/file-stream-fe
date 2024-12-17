import { FolderTree } from "@/types/node-types";
import FolderMenuTree from "@components/folder-menu-tree";

type FolderTreeWrapperProps = {
  folderTree: FolderTree;
  hash?: string;
};

export default function FolderTreeWrapper({
  folderTree,
  hash,
}: FolderTreeWrapperProps) {
  const isShared = !!hash;
  return (
    <div>
      <div className="mx-auto bg-col-white-transparent p-2 w-[95%] rounded-xl pl-2 mb-5 text-xl ">
        <h2 className="mb-1">{!isShared ? "Your folder" : "Shared folder"}</h2>
        <FolderMenuTree folder={folderTree} hash={hash} />
      </div>
    </div>
  );
}
