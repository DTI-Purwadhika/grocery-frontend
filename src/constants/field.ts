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
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
    },
  ],
};
