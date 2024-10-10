export const Category = {
  selected: ["name", "totalProduct", "actions"],
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

export const Promotion = {
  selected: ["name", "type", "value", "minPurchaseAmount", "maxDiscountAmount", "actions"],
  columns: [
    {
      key: "code",
      label: "Code",
      sortable: true,
    },
    {
      key: "name",
      label: "Promotion Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
    },
    {
      key: "minPurchaseAmount",
      label: "Minimum Purchases",
      sortable: true,
    },
    {
      key: "maxDiscountAmount",
      label: "Maximum Discount",
      sortable: true,
    },
    {
      key: "productName",
      label: "Product Name",
      sortable: true,
    },
    {
      key: "storeName",
      label: "Store Name",
    },
    {
      key: "quota",
      label: "Total Quota",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions ",
      align: "end" as "end",
    },
  ],
};

export const Admin = {
  selected: ["name", "role", "store", "actions"],
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "store",
      label: "Store",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions ",
      align: "end" as "end",
    },
  ],
};

export const User = {
  selected: ["name", "email", "isVerified"],
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "isVerified",
      label: "Verified",
      sortable: true,
    },
  ],
};

export const StockReport = {
  selected: ["totalAdditions", "totalDeductions", "finalStock"],
  columns: [
    {
      key: "totalAdditions",
      label: "Inbound",
      sortable: true,
    },
    {
      key: "totalDeductions",
      label: "Outbound",
      sortable: true,
    },
    {
      key: "finalStock",
      label: "Current Stock",
      sortable: true,
    },
  ],
};

export const Order = {
  selected: ["status", "code", "totalPayment", "expiryDate", "createdAt", "order"],
  columns: [
    {
      key: "code",
      label: "Code",
      sortable: true,
    },
    {
      key: "user",
      label: "User",
      sortable: true,
    },
    {
      key: "store",
      label: "Store",
      sortable: true,
    },
    {
      key: "resiNumber",
      label: "Resi Number",
      sortable: true,
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      sortable: true,
    },
    {
      key: "totalShipment",
      label: "Total Shipment",
      sortable: true,
    },
    {
      key: "totalDiscount",
      label: "Total Discount",
      sortable: true,
    },
    {
      key: "totalPayment",
      label: "Total Payment",
      sortable: true,
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Purchase Date",
      sortable: true,
    },
    {
      key: "proofUrl",
      label: "Proof URL",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
    },
    {
      key: "order",
      label: "Action",
      align: "end" as "end",
    },
  ],
};

export const Store = {
  selected: ["name", "address", "city", "postcode", "lat", "lng", "actions"],
  columns: [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "address",
      label: "Address",
      sortable: true,
    },
    {
      key: "city",
      label: "City",
      sortable: true,
    },
    {
      key: "postcode",
      label: "Postcode",
      sortable: true,
    },
    {
      key: "lat",
      label: "Latitude",
      sortable: true,
    },
    {
      key: "lng",
      label: "Longitude",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions ",
    },
  ],
};
