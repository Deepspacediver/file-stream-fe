import { useGetFolderContent } from "@/api/queries/users-queries";
import FolderTable from "@/components/folder-table";
import Loader from "@/components/loader";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function FolderView() {
  const params = useParams();
  const { folderId } = params;
  const { user } = useContext(UserContext);
  const userId = user ? +user.userId : null;
  const nodeId = folderId ? +folderId : null;

  const { folderWithContent, isLoading } = useGetFolderContent({
    userId,
    nodeId,
  });

  if (isLoading) {
    return <Loader isCentered />;
  }

  return (
    <div className="p-2 my-3">
      <h2 className="text-3xl font-medium">{folderWithContent?.name}</h2>
      <FolderTable folderContent={folderWithContent?.content ?? []} />
    </div>
  );
}
