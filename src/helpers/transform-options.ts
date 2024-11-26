import { UserFolderResponse } from "@/types/node-types";

export const transformFolderToOptions = (folders: UserFolderResponse[]) => {
  return folders.map(({ nodeId, name }) => ({ id: nodeId, name }));
};
