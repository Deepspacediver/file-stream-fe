import { useGetUserFolders } from "@/api/queries/users-queries";
import FolderPreviewItem from "@/components/folder-preview-item";
import Loader from "@/components/loader";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export default function Dasboard() {
  const { user } = useContext(UserContext);
  const { folders, isLoading } = useGetUserFolders(user?.userId);

  if (isLoading) {
    return <Loader isCentered />;
  }

  return (
    <div className="flex flex-col pt-4 gap-4 max-w-[1200px] mx-auto w-full">
      <h2 className="font-medium text-2xl self-center">
        Welcome to your drive
      </h2>
      <div className="grid auto-fill-cols justify-center items-center gap-4 lg:gap-6 2xl:gap-8">
        {!folders || !folders?.length ? (
          <p>No folders found </p>
        ) : (
          folders.map((folder) => (
            <FolderPreviewItem key={folder.nodeId} folder={folder} />
          ))
        )}
      </div>
    </div>
  );
}
