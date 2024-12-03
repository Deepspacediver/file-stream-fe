import { capitalizeString } from "@/helpers/string-helpers";
import { FolderContent, NodeTypes } from "@/types/node-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomNavlink from "./custom-navlink";
import FolderIcon from "@/assets/icons/folder-white-outline.svg?react";
import FileIcon from "@/assets/icons/file-icon.svg?react";

type FolderTableProps = {
  folderContent: FolderContent[];
};

export default function FolderTable({ folderContent }: FolderTableProps) {
  const columnHelper = createColumnHelper<FolderContent>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row, getValue }) => {
        const cellData = getValue();
        const isFolder = row.original.type === NodeTypes.FOLDER;
        const iconDimensionStyle = "w-6 h-6 lg:w-7 lg:h-7";
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
      cell: ({ row, getValue }) => {
        const cellData = getValue();
        const folderLink = `/folders/${row.original.nodeId}`;
        return cellData ? (
          <a className="underline" href={cellData}>
            Link
          </a>
        ) : (
          <CustomNavlink to={folderLink}>Link</CustomNavlink>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: folderContent,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full ">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id} className=" border-b-2 border-gray-300">
              {headerGroup.headers.map((header) => {
                return (
                  <th className="p-2" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
            <tr key={row.id} className="border-b-2 border-gray-300">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className="text-center p-2" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
