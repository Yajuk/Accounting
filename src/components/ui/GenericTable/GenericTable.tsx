/**
 * A generic table component that provides a flexible and customizable way to display tabular data.
 *
 * The `GenericTable` component takes in a set of columns, data, and various event handlers to control the table's behavior.
 * It supports features like sorting, filtering, pagination, row selection, and detail panel expansion.
 *
 * @template T - The type of the data objects in the table.
 * @param {GenericTableProps<T>} props - The props for the `GenericTable` component.
 * @param {Column<T>[]} props.columns - An array of column definitions, each with a key, label, and optional render function, width, sortable, and filterable properties.
 * @param {T[]} props.data - The data to be displayed in the table.
 * @param {number} props.totalCount - The total number of rows in the data set.
 * @param {number} props.page - The current page index.
 * @param {number} props.rowsPerPage - The number of rows to display per page.
 * @param {boolean} [props.loading] - Whether the table is currently loading data.
 * @param {(row: T) => void} [props.onRowClick] - A callback function that is called when a row is clicked.
 * @param {(selectedIds: T["_id"][]) => void} [props.onSelectionChange] - A callback function that is called when the row selection changes.
 * @param {(newPage: number) => void} props.onPageChange - A callback function that is called when the page changes.
 * @param {(newRowsPerPage: number) => void} props.onRowsPerPageChange - A callback function that is called when the rows per page changes.
 * @param {(row: T) => React.ReactNode} [props.renderDetailPanel] - A function that returns a React node to be displayed in a detail panel for each row.
 * @param {(rowId: T["_id"]) => void} [props.onRowEdit] - A callback function that is called when the edit action is triggered for a row.
 * @param {boolean} [props.showEditAction] - Whether to display the edit action for each row.
 * @returns {React.ReactElement} - The `GenericTable` component.
 */
import React, { useState, useMemo, use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  IconButton,
  Checkbox,
  Box,
  LinearProgress,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  FilterList,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableData {
  _id?: string | number;
  [key: string]: any;
}

interface GenericTableProps<T extends TableData> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedIds: T["_id"][]) => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  renderDetailPanel?: (row: T) => React.ReactNode;
  onRowEdit?: (rowId: T["_id"]) => void;
  showEditAction?: boolean;
}

const GenericTable = <T extends TableData>({
  columns,
  data,
  totalCount,
  page,
  rowsPerPage,
  loading = false,
  onRowClick,
  onSelectionChange,
  onPageChange,
  onRowsPerPageChange,
  renderDetailPanel,
  onRowEdit,
  showEditAction = false,
}: GenericTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const [selectedRows, setSelectedRows] = useState<T["_id"][]>([]);
  const [expandedRows, setExpandedRows] = useState<T["_id"][]>([]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const order = sortConfig.direction === "asc" ? 1 : -1;
      if (a[sortConfig.key!] < b[sortConfig.key!]) return -1 * order;
      if (a[sortConfig.key!] > b[sortConfig.key!]) return 1 * order;
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.entries(filters).every(
        ([columnKey, filterValue]) =>
          filterValue === "" ||
          String(row[columnKey as keyof T])
            .toLowerCase()
            .includes(filterValue?.toLowerCase() ?? ""),
      ),
    );
  }, [sortedData, filters]);

  // Sorting change handler
  const handleSortChange = (columnKey: keyof T) => {
    setSortConfig((prevConfig) => ({
      key: columnKey,
      direction:
        prevConfig.key === columnKey && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Pagination change handler
  const handleChangePage = (_: unknown, newPage: number) =>
    onPageChange(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  // Filter change handler
  const handleFilterChange = (columnKey: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [columnKey]: value }));
  };

  // Selection handlers
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = filteredData.map((row) => row._id);
      setSelectedRows(newSelectedRows);
      onSelectionChange?.(newSelectedRows);
    } else {
      setSelectedRows([]);
      onSelectionChange?.([]);
    }
  };

  const handleRowSelect = (id: T["_id"]) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows: T["_id"][] = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelectedRows);
    onSelectionChange?.(newSelectedRows);
  };

  // Expand/Collapse handlers
  const handleRowExpand = (id: T["_id"]) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {loading && <LinearProgress />}
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {renderDetailPanel && <TableCell />}
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < filteredData.length
                  }
                  checked={
                    filteredData.length > 0 &&
                    selectedRows.length === filteredData.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  style={{ width: column.width }}
                >
                  {column.sortable !== false && (
                    <TableSortLabel
                      active={sortConfig.key === column.key}
                      direction={sortConfig.direction}
                      onClick={() => handleSortChange(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                  {column.filterable !== false && (
                    <TextField
                      size="small"
                      placeholder="Filter"
                      value={filters[column.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.key, e.target.value)
                      }
                    />
                  )}
                </TableCell>
              ))}
              {showEditAction && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <React.Fragment key={row._id}>
                <TableRow
                  hover
                  onClick={() => onRowClick?.(row)}
                  role="checkbox"
                  aria-checked={selectedRows.includes(row._id)}
                  tabIndex={-1}
                  selected={selectedRows.includes(row._id)}
                >
                  {renderDetailPanel && (
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowExpand(row._id)}
                      >
                        {expandedRows.includes(row._id) ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                  )}
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleRowSelect(row._id)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </TableCell>
                  ))}
                  {showEditAction && (
                    <TableCell>
                      <IconButton onClick={() => onRowEdit?.(row._id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
                {renderDetailPanel && (
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={columns.length + 3}
                    >
                      <Collapse
                        in={expandedRows.includes(row._id)}
                        timeout="auto"
                        unmountOnExit
                      >
                        {renderDetailPanel(row)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Box>
  );
};

export default GenericTable;

// usage
/**
 * import React, { useState } from 'react';
import GenericTable, { Column } from '../components/ui/GenericTable'; // Assuming the path is correct

interface MyData {
  _id: string;
  name: string;
  age: number;
  city: string;
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<MyData[]>([
    { _id: '1', name: 'John Doe', age: 30, city: 'New York' },
    { _id: '2', name: 'Jane Doe', age: 25, city: 'London' },
    { _id: '3', name: 'Peter Pan', age: 20, city: 'Neverland' },
  ]);

  const [totalCount, setTotalCount] = useState(data.length);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns: Column<MyData>[] = [
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'age', label: 'Age', sortable: true, width: 80 },
    {
      key: 'city',
      label: 'City',
      render: (value, row) => (
        <span style={{ color: row.age > 25 ? 'green' : 'red' }}>
          {value}
        </span>
      ),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Fetch new data based on newPage and rowsPerPage
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when rowsPerPage changes
    // Fetch new data based on newPage (0) and newRowsPerPage
  };

  const handleSelectionChange = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows);
    // Handle selected rows
  };

  const handleRowClick = (row: MyData) => {
    console.log('Row clicked:', row);
    // Handle row click
  };

  const handleRowEdit = (rowId: string) => {
    console.log('Edit row:', rowId);
    // Handle row edit
  };

  return (
    <div>
      <GenericTable
        columns={columns}
        data={data}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSelectionChange={handleSelectionChange}
        onRowClick={handleRowClick}
        onRowEdit={handleRowEdit}
        showEditAction
      />
    </div>
  );
};

export default MyComponent;

 */
