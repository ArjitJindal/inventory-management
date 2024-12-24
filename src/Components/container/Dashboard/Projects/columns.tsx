"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProjectT } from "../../../../types/project";
import { Eye, Pencil, Trash, EyeOff } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../../../../context/Context";
import { cn } from "../../../../lib/utils";
import { mutate } from "swr";
import { PROJECTS_URL } from "../../../../constants";

export const useColumns = ({
  onEdit,
}: {
  onEdit: (project: IProjectT) => void;
}): ColumnDef<IProjectT>[] => {
  const context = useContext(MyContext);
  const { sharedState } = context || {};

  const handleDelete = (name: string) => async () => {
    await mutate(
      PROJECTS_URL,
      (data?: IProjectT[]) => {
        if (!data) return [];
        return data.filter((p) => p.name !== name);
      },
      false
    );
  };

  const handleDisable = (name: string) => async () => {
    await mutate(
      PROJECTS_URL,
      (data?: IProjectT[]) => {
        if (!data) return [];
        return data.map((p) => {
          if (p.name === name) {
            return { ...p, disabled: !p.disabled };
          }
          return p;
        });
      },
      false
    );
  };

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return <div className="text-white font-medium">{name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <div className="text-white font-medium">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const value = row.getValue("price") as string;
        return (
          <div className="text-white font-medium">
            {value.startsWith("$") ? value : `$${value}`}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as string;
        return <div className="text-white font-medium">{quantity}</div>;
      },
    },
    {
      accessorFn: (row) => `${row.value} ${row.quantity}`,
      header: "Value",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        const value = row.getValue("price") as string;
        const numericValue = parseFloat(value.replace(/^\$/, ""));
        const totalValue = quantity * numericValue;
        return (
          <div className="text-white font-medium">
            {totalValue ? `$${totalValue}` : totalValue}
          </div>
        );
      },
    },
    {
      accessorKey: "disabled",
      header: "Actions",
      cell: ({ row }) => {
        const disabled = row.getValue("disabled") as boolean;
        const name = row.getValue("name") as string;
        const isDisabled = sharedState?.view !== "admin";
        const project = row.original as IProjectT;
        return (
          <div className="flex gap-3">
            <Pencil
              className={cn(
                isDisabled || disabled
                  ? "fill-slate-500"
                  : "fill-green-400 cursor-pointer"
              )}
              onClick={
                isDisabled || disabled ? undefined : () => onEdit(project)
              }
            />
            {!disabled ? (
              <Eye
                className={cn(
                  isDisabled
                    ? "stroke-slate-500"
                    : "stroke-purple-400 cursor-pointer"
                )}
                onClick={isDisabled ? undefined : handleDisable(name)}
              />
            ) : (
              <EyeOff
                className={cn(
                  isDisabled
                    ? "stroke-slate-500"
                    : "stroke-purple-400 cursor-pointer"
                )}
                onClick={isDisabled ? undefined : handleDisable(name)}
              />
            )}
            <Trash
              className={cn(
                isDisabled
                  ? "stroke-slate-500"
                  : "stroke-red-400 cursor-pointer"
              )}
              onClick={isDisabled ? undefined : handleDelete(name)}
            />
          </div>
        );
      },
    },
  ];
};
