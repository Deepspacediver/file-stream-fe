import { UserFolderResponse } from "@/types/node-types";

export const transformFolderToOptions = (folders: UserFolderResponse[]) => {
  return folders.map(({ node_id, name }) => ({ id: node_id, name }));
};
