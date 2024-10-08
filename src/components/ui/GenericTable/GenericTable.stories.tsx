import React, { useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import GenericTable, { Column, TableData } from "./GenericTable";

const columns: Column<TableData>[] = [
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "price", label: "Price", sortable: true, width: 100 },
  { key: "category", label: "Category", sortable: false },
];

const sampleData: TableData[] = [
  { _id: "1", name: "Product A", price: 20.5, category: "Electronics" },
  { _id: "2", name: "Product B", price: 15.0, category: "Books" },
  { _id: "3", name: "Product C", price: 5.99, category: "Clothing" },
];

const meta = {
  title: "Components/UI/GenericTable",
  component: GenericTable,
  tags: ["autodocs"],
} satisfies Meta<typeof GenericTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [data, setData] = useState(args.data);
    const [totalCount, setTotalCount] = useState(args.totalCount);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    };

    return (
      <GenericTable
        {...args}
        data={data}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    );
  },
};

export const BasicTable: Story = {
  ...Template,
  args: {
    columns,
    data: sampleData,
    totalCount: sampleData.length,
    page: 0,
    rowsPerPage: 10,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
  },
};

export const LoadingTable: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    loading: true,
  },
};

export const EmptyTable: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    data: [],
    totalCount: 0,
  },
};

export const TableWithPagination: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    totalCount: 100,
  },
};

export const TableWithRowClick: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    onRowClick: (row: TableData) => console.log(`Clicked row:`, row),
  },
};

export const TableWithCustomCell: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    columns: [
      ...columns,
      {
        key: "action",
        label: "Action",
        render: (value: any, row: TableData) => (
          <button onClick={() => console.log(`Action for ${row.name}`)}>
            Click me
          </button>
        ),
      },
    ],
  },
};

export const TableWithSelection: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    onSelectionChange: (selectedIds: (string | number | undefined)[]) =>
      console.log(`Selected rows:`, selectedIds),
  },
};

export const TableWithEditAction: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    showEditAction: true,
  },
};

export const TableWithDeleteAction: Story = {
  ...Template,
  args: {
    ...BasicTable.args,
    showEditAction: true,
  },
};
