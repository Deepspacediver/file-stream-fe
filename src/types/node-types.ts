export enum NodeTypes {
  FOLDER = "FOLDER",
  FILE = "FILE",
}

export type NodeObject = {
  nodeId: number;
  name: string;
  type: NodeTypes;
  fileLink: string | null;
  userId: number;
  parentNodeId: number;
};

export type CreateFolder = Pick<
  NodeObject,
  "name" | "parentNodeId" | "type" | "userId"
>;

export type UserFolderResponse = Pick<
  NodeObject,
  "name" | "nodeId" | "userId" | "parentNodeId"
>;

export type CreateFile = Pick<
  NodeObject,
  "name" | "type" | "userId" | "parentNodeId"
> & {
  file: File;
};

export type FolderTree = Pick<
  NodeObject,
  "name" | "nodeId" | "parentNodeId" | "userId"
> & {
  children?: FolderTree[];
};

export type FolderOption = { id: number; name: string };

export type FolderContentRequest = {
  userId: number | null;
  nodeId: number | null;
};

export type FolderContent = Pick<
  NodeObject,
  "nodeId" | "fileLink" | "type" | "name"
>;

export type FolderContentResponse = {
  name: string;
  content: FolderContent[];
};

export type EditNodeCell = Pick<
  NodeObject,
  "nodeId" | "parentNodeId" | "type" | "name"
>;

export type EditNodeRequest = Pick<
  NodeObject,
  "userId" | "parentNodeId" | "name" | "nodeId"
>;

export type DeleteNodeRequest = Pick<NodeObject, "userId" | "nodeId">;
