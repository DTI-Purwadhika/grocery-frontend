"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@nextui-org/table";
import { Key, useCallback, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchData } from "@/services/dataService";
import { useParam } from "@/hooks/useParam";
import { Loading } from "@/components/elements";

import { TableType } from "./type";
import Cell from "./Cells";
import { BottomContent, TopContent } from "./Content";

const Datatable = ({ title = "data", columns, defaultCol = ["actions"] }: TableType) => {
  const { getQueryParam, setQueryParam } = useParam();
  const [selected, setSelected] = useState<Set<string>>(new Set([]));
  const sorter = (getQueryParam("sort") || "id,ascending").split(",");
  const [sort, setSort] = useState<SortDescriptor>({
    column: sorter[0],
    direction: sorter[1] as "ascending" | "descending",
  });

  const columnParam = getQueryParam("visibleColumns") || defaultCol.map((col) => col).join(",");
  const visibleColumns = new Set(columnParam.split(","));
  const page = parseInt(getQueryParam("page") || "1", 10);
  const size = parseInt(getQueryParam("size") || "10", 10);
  const keyword = getQueryParam("keyword") || "";
  const category = getQueryParam("category") || "";
  const store = getQueryParam("stores") || "";

  const { data, isLoading } = useQuery({
    queryKey: [
      title,
      keyword,
      page,
      size,
      sort.column?.toString() || "id",
      sort.direction?.toString() || "ascending",
      category,
      store,
    ],
    queryFn: fetchData,
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   if (title === "inventory") restService("inventory/generate-stock", "POST");
  // }, []);

  const renderCell = useCallback(
    (data: any, columnKey: Key) => {
      return Cell(data, columnKey, title);
    },
    [title],
  );

  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  const handleSortChange = (sortBy: SortDescriptor) => {
    setQueryParam("sort", sortBy.column + "," + sortBy.direction);
    setSort(sortBy);
  };

  const handleSelectionChange = (keys: "all" | Set<Key>) => {
    if (keys === "all") {
      setSelected((prevSelected) => {
        const newSelected = new Set(prevSelected);

        data?.content.forEach((data: { id: string }) => {
          const id = data.id;

          if (!newSelected.has(id)) newSelected.add(id);
        });

        return newSelected;
      });
    } else setSelected(new Set(Array.from(keys) as string[]));
  };

  return (
    <Table
      removeWrapper
      aria-label={`Data of ${title}`}
      bottomContent={
        data?.totalPage > 0 ? (
          <BottomContent
            selectedSize={selected.size}
            totalData={data?.totalData}
            totalPages={data?.totalPage}
          />
        ) : null
      }
      bottomContentPlacement="outside"
      classNames={{
        table: "min-h-[400px]",
      }}
      color={"primary"}
      isHeaderSticky={true}
      selectedKeys={selected}
      selectionMode="multiple"
      shadow="md"
      sortDescriptor={sort}
      topContent={<TopContent columns={columns} title={title} />}
      topContentPlacement="outside"
      onSelectionChange={(keys) => handleSelectionChange(keys)}
      onSortChange={(sortDescriptor) => {
        handleSortChange(sortDescriptor);
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.align}
            allowsSorting={column.sortable && true}
            id={column.key}
          >
            {column?.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={`No ${title} to display.`}
        isLoading={isLoading}
        items={data?.content || []}
        loadingContent={<Loading title={title} />}
      >
        {(item: { id: string }) => (
          <TableRow key={item.id} id={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Datatable;
