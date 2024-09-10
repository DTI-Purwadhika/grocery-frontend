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
      label: "Actions",
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
      label: "Actions",
    },
  ],
};

export const Inventory = {
  selected: ["code", "name", "storeName", "totalStock", "actions"],
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
    // {
    //   key: "actions",
    //   label: "Actions",
    // },
  ],
};
