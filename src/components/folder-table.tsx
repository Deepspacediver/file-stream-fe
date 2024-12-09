import { capitalizeString } from "@/helpers/string-helpers";
import {
  EditNodeCell,
  FolderContent,
  NodeToBeDeleted,
  NodeTypes,
} from "@/types/node-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import FolderIcon from "@/assets/icons/folder-white-outline.svg?react";
import EditPen from "@/assets/icons/edit-pen.svg?react";
import TrashBin from "@/assets/icons/trash-can.svg?react";
import FileIcon from "@/assets/icons/file-icon.svg?react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import CopyText from "./copy-text";

type FolderTableProps = {
  folderContent: FolderContent[];
  setNodeToBeDeleted: Dispatch<NodeToBeDeleted>;
  setEditedNode: Dispatch<SetStateAction<EditNodeCell | null>>;
  openDeleteModal: () => void;
  openNodeModal: () => void;
};

export default function FolderTable({
  folderContent,
  openDeleteModal,
  openNodeModal,
  setNodeToBeDeleted,
  setEditedNode,
}: FolderTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<FolderContent>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        size: 300,
        cell: ({ row, getValue }) => {
          const cellData = getValue();
          const isFolder = row.original.type === NodeTypes.FOLDER;
          const iconDimensionStyle =
            "min-w-5 min-h-5  w-5 h-5 lg:min-w-7 lg:min-h-7 lg:w-7 lg:h-7";
          const icon = isFolder ? (
            <FolderIcon className={`text-col-black ${iconDimensionStyle}`} />
          ) : (
            <FileIcon className={`${iconDimensionStyle}`} />
          );
          return (
            <span className="flex items-center gap-2">
              {icon}
              {cellData}
            </span>
          );
        },
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => capitalizeString(info.getValue()),
      }),
      columnHelper.accessor("fileLink", {
        header: "Link",
        enableSorting: false,
        cell: ({ row, getValue }) => {
          const cellData = getValue();
          const folderLink = `${location.host}/folders/${row.original.nodeId}`;
          return <CopyText text={cellData ?? folderLink} />;
        },
      }),
      columnHelper.display({
        id: "Edit",
        header: "Edit",
        enableResizing: false,
        maxSize: 20,
        cell: (cell) => {
          const data = cell.row.original;
          const cellNode = {
            nodeId: data.nodeId,
            name: data.name,
            type: data.type,
            parentNodeId: data.parentNodeId,
          };
          return (
            <EditPen
              className="min-w-6 min-h-6 h-6 w-6 mx-auto"
              onClick={(e) => {
                e.stopPropagation();
                setEditedNode(cellNode);
                openNodeModal();
              }}
            />
          );
        },
      }),
      columnHelper.display({
        id: "Delete",
        header: "Delete",
        enableResizing: false,
        maxSize: 20,
        cell: (cell) => {
          const data = cell.row.original;
          const nodeId = data.nodeId;
          return (
            <TrashBin
              className="min-w-6 min-h-6 h-6 w-6 mx-auto"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal();
                setNodeToBeDeleted({ nodeId, isDeletingFromItsView: false });
              }}
            />
          );
        },
      }),
    ],
    [
      columnHelper,
      openDeleteModal,
      openNodeModal,
      setEditedNode,
      setNodeToBeDeleted,
    ]
  );

  const table = useReactTable({
    data: folderContent,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <>
      <table className="w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id} className=" border-b-2 border-gray-300">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      style={{
                        width: header.getSize(),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`p-2 relative ${
                        header.column.getCanSort() && "hover:cursor-pointer"
                      }`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span className="absolute ml-2 bottom-1 text-lg">
                        {{
                          asc: "  \u2191",
                          desc: "  \u2193",
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={clsx(
                  "border-b-2 border-gray-300 focus:bg-col-black ",
                  "cursor-pointer hover:bg-gray-200"
                )}
                onClick={() => {
                  if (row.original.type === NodeTypes.FOLDER) {
                    navigate(`/folders/${row.original.nodeId}`);
                    return;
                  }
                  const fileLink = row.original.fileLink;
                  if (fileLink) {
                    window.open(fileLink, "_blank");
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="text-center p-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
