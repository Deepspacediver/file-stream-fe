export enum NodeTypes {
  FOLDER = "FOLDER",
  FILE = "FILE",
}

export type CreateFolder = {
  name: string;
  parentNodeId: number;
  type: NodeTypes.FOLDER;
  userId: number;
};

export type UserFolderResponse = {
  node_id: number;
  name: string;
};
