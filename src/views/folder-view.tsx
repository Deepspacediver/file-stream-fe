import { useParams } from "react-router-dom";

export default function FolderView() {
  const params = useParams();
  const { folderId } = params;

  return <div>{folderId}</div>;
}
