import { useGetFolderContent } from "@/api/queries/users-queries";
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

  const { folderContent, isLoading } = useGetFolderContent({ userId, nodeId });

  if (isLoading) {
    return <Loader isCentered />;
  }
  console.log({ userId, nodeId, folderContent });

  return <div>{folderId}</div>;
}
