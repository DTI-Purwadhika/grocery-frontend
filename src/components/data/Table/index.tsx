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
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import restService from "@/services/restService";
import { useQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/elements";

import { TableType } from "./type";
import Cell from "./Cells";
import { BottomContent, TopContent } from "./Content";

const Datatable = ({ title = "data", columns, defaultCol = ["actions"] }: TableType) => {
  const { getQueryParam, setQueryParam } = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set([]));
  const [collectData, setCollectData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [page, size, sort, keyword]);

  const fetchData = async () => {
    const endpoint = `${title.toLowerCase()}?keyword=${keyword.toLowerCase()}&page=${page - 1}&size=${size}&sortBy=${sort?.column}&sortDir=${sort?.direction?.replace("ending", "")}`;
    const { content, totalData, totalPage } = await restService(endpoint);

    setCollectData(content);
    setTotalData(totalData);
    setTotalPages(totalPage);

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const renderCell = useCallback((data: any, columnKey: Key) => {
    return Cell(data, columnKey, title, fetchData);
  }, []);

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

        collectData.forEach((data) => {
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
        totalPages > 0 ? (
          <BottomContent
            selectedSize={selected.size}
            totalData={totalData}
            totalPages={totalPages}
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
        items={collectData}
        loadingContent={<Loading noCard title={title} />}
      >
        {(item) => (
          <TableRow key={item.id} id={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Datatable;
