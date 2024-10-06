"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import { Box, Button, Card, Divider } from "@mui/material";
import {
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useRef, useState } from "react";

import { useModal } from "@/components/ui/FormTextField/MuiModal";
import { columns, styles } from "@/config/voucherTableConfig";
import { useVouchersList } from "@/hooks/useVouchers";
import { debounce } from "@/utils/debounce";
import { IPaginationModel, ISearchFilter } from "@/utils/types/productTypes";

const VoucherList = () => {
  const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { handleOpen, handleClose, open } = useModal();

  const [search, setSearch] = useState<string>("");
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>({});
  const { vouchers, totalCount, isLoading, reFetchVouchers } = useVouchersList(
    paginationModel,
    search,
  );
  const [currentEditRecord, setCurrentEditRecord] = useState<
    Record<string, any> | undefined
  >(undefined);
  const rowCountRef = useRef<number>(totalCount || 0);
  const rowCount = useMemo<number>(() => {
    if (totalCount !== undefined) {
      rowCountRef.current = totalCount;
    }
    return rowCountRef.current;
  }, [totalCount]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    [],
  );

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    if (filterModel?.quickFilterValues) {
      setSearch(filterModel.quickFilterValues[0]);
    }
  }, []);

  const onSearchFilterChange = useCallback((newFilters: ISearchFilter) => {
    setSearchFilters(newFilters);
  }, []);

  const onSuccess = useCallback(() => {
    handleClose();
    setCurrentEditRecord(undefined);
    reFetchVouchers();
  }, []);

  const handleCloseModal = () => {
    setCurrentEditRecord(undefined);
    handleClose();
  };
  return (
    <Box mt={4} p={2} margin="auto">
      <DataTable
        sx={styles}
        getRowId={(row) => row._id}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setCurrentEditRecord(params.row);
                      handleOpen();
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              );
            },
          },
        ]}
        rows={vouchers}
        rowCount={rowCount}
        loading={isLoading}
        filterMode="server"
        pageSizeOptions={[10, 20, 50]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        density="compact"
        disableColumnSorting
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 300,
            },
            showExport: false,
          },
        }}
        onFilterModelChange={onFilterChange}
        autosizeOnMount
        autoHeight
        autosizeOptions={{
          includeOutliers: true,
          includeHeaders: true,
          outliersFactor: 1,
          expand: true,
        }}
      />
    </Box>
  );
};

export default VoucherList;
