export const Category = {
  selected: ["name", "description", "totalProduct", "actions"],
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "totalProduct",
      label: "Total Products",
      sortable: false,
    },
    {
      key: "actions",
      label: "Actions ",
      align: "end" as "end",
    },
  ],
};

export const Product = {
  selected: ["name", "category", "price", "actions"],
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions ",
      align: "end" as "end",
    },
  ],
};

export const Inventory = {
  selected: ["name", "storeName", "totalStock", "inventory"],
  columns: [
    {
      key: "code",
      label: "Code",
      sortable: true,
    },
    {
      key: "name",
      label: "Product Name",
    },
    {
      key: "storeName",
      label: "Store Name",
    },
    {
      key: "totalStock",
      label: "Total Stock",
      sortable: true,
    },
    {
      key: "inventory",
      label: "Actions ",
      align: "end" as "end",
    },
  ],
};
