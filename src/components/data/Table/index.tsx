"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

import restService from "@/services/restService";

import { TableType } from "./type";
import Cell from "./Cells";
import { BottomContent, TopContent } from "./Content";
import StockContent from "./Content/Top/Inventory";

const Datatable = ({ title = "data", columns, defaultCol = ["actions"] }: TableType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(defaultCol));
  const [collectData, setCollectData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState<Key>("id");
  const [sortDir, setSortDir] = useState<"ascending" | "descending">("ascending");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [page, size, sortBy, sortDir, keyword]);

  const fetchData = async () => {
    const endpoint = `${title.toLowerCase()}?keyword=${keyword.toLowerCase()}&page=${page - 1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir?.replace("ending", "")}`;
    const { content, totalData, totalPage } = await restService(endpoint);

    setCollectData(content);
    setTotalData(totalData);
    setTotalPages(totalPage);
    setIsLoading(false);
  };

  const renderCell = useCallback((data: any, columnKey: Key) => {
    return Cell(data, columnKey, title, fetchData);
  }, []);
  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  const handleSortChange = (
    column: Key | undefined,
    direction: "ascending" | "descending" | undefined,
  ) => {
    if (column) setSortBy(column);
    if (direction) setSortDir(direction);
  };

  const handleSelectionChange = (keys: "all" | Set<Key>) => {
    if (keys === "all") {
      setSelected((prevSelected) => {
        const newSelected = new Set(prevSelected);

        collectData.forEach((data) => {
          const idOrName = data.id || data.name;

          if (!newSelected.has(idOrName)) {
            newSelected.add(idOrName);
          }
        });

        return newSelected;
      });
    } else {
      setSelected(new Set(Array.from(keys) as string[]));
    }
  };

  return (
    <Table
      aria-label={`Data of ${title}`}
      bottomContent={
        totalPages > 0 ? (
          <BottomContent
            page={page}
            selectedSize={selected.size}
            setPage={setPage}
            totalData={totalData}
            totalPages={totalPages}
          />
        ) : null
      }
      color={"primary"}
      selectedKeys={selected}
      selectionMode="multiple"
      shadow="md"
      sortDescriptor={{ column: sortBy as string, direction: sortDir }}
      topContent={
        title === "inventory" ? (
          <StockContent
            columns={columns}
            setVisibleColumns={setVisibleColumns}
            title={title}
            visibleColumns={visibleColumns}
            onSearch={setKeyword}
            onSize={setSize}
          />
        ) : (
          <TopContent
            columns={columns}
            setVisibleColumns={setVisibleColumns}
            title={title}
            visibleColumns={visibleColumns}
            onSearch={setKeyword}
            onSize={setSize}
          />
        )
      }
      onSelectionChange={(keys) => handleSelectionChange(keys)}
      onSortChange={(sortDescriptor) => {
        handleSortChange(sortDescriptor.column, sortDescriptor.direction);
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column?.key} allowsSorting={column.sortable && true}>
            {column?.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={`No ${title} to display.`}
        isLoading={isLoading}
        items={collectData}
        loadingContent={<Spinner label={`Receiving ${title}...`} />}
      >
        {(item) => (
          <TableRow key={item.id || item.name}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Datatable;
