import { DataGrid } from "@mui/x-data-grid";
import {
  DataGridPropsWithDefaultValues,
  DataGridPropsWithComplexDefaultValueBeforeProcessing,
  DataGridPropsWithoutDefaultValue,
  DataGridForcedPropsKey,
} from "@mui/x-data-grid/internals";
import { JSX, RefAttributes } from "react";

type DataTableType = JSX.IntrinsicAttributes &
  Omit<
    Partial<DataGridPropsWithDefaultValues<any>> &
      DataGridPropsWithComplexDefaultValueBeforeProcessing &
      DataGridPropsWithoutDefaultValue<any>,
    DataGridForcedPropsKey
  > & { pagination?: true | undefined } & RefAttributes<HTMLDivElement>;

const DataTable = (props: DataTableType) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid {...props} />
    </div>
  );
};

export default DataTable;
