import { useGetSharedFolderWithContent } from "@/api/queries/shared-nodes-queries";
import { useGetFolderContent } from "@/api/queries/users-queries";
import Loader from "@/components/loader";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import FolderView from "./folder-view";

export default function FolderViewWrapper() {
  const { folderId, hash, sharedFolderId } = useParams();
  const sharedNodeId = sharedFolderId ? +sharedFolderId : null;
  const nodeId = folderId ? +folderId : null;

  console.log({ hash, nodeId, sharedNodeId });

  const { user } = useContext(UserContext);
  const userId = user?.userId;

  const { sharedFolderContent, isLoading: isSharedFolderContentLoading } =
    useGetSharedFolderWithContent(hash, !!sharedNodeId || !!nodeId);

  const { folderWithContent, isLoading: isUserFolderContentLoading } =
    useGetFolderContent({
      userId,
      nodeId: nodeId ?? sharedNodeId,
    });

  if (isSharedFolderContentLoading || isUserFolderContentLoading) {
    return <Loader isCentered />;
  }

  return (
    <FolderView
      isShared={!!hash}
      folderWithContent={sharedFolderContent ?? folderWithContent}
    />
  );
}
