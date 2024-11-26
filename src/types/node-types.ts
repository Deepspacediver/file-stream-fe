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

export type UserFolderResponse = Pick<NodeObject, "name" | "nodeId">;

export type CreateFile = Pick<
  NodeObject,
  "name" | "type" | "userId" | "parentNodeId"
> & {
  file: File;
};

export type CreateFileFormData = {
  userId: number;
  formData: FormData;
};
