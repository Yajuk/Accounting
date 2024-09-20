import MuiModal, { useModal } from "@/components/ui/FormTextField/MuiModal";
import { AddCircle } from "@mui/icons-material";
import { debounce } from "@/utils/debounce";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useLookupData, IOption } from "@/hooks/useLookupData";

export interface IProps<T> {
  label: string; // Dropdown label (e.g., "Brand" or "Category")
  control: any; // Object from useForm hook
  name: string; // Name of the field in the form
  setValue: any; // Function to set the value of the field in the form
  fetchFunction: () => Promise<T[]>; // Generic function to fetch data (e.g., getCategories, getBrands)
  CreateModalComponent: React.ComponentType<{
    onSuccess: () => void;
  }>;
  mapOption: (item: T) => IOption; // Function to map the fetched data to IOption
  className?: string; // Class name to be applied to the component
}

const LookupDropdown = <T,>({
  label,
  control,
  name,
  setValue,
  fetchFunction,
  mapOption,
  className = "",
  CreateModalComponent,
}: IProps<T>) => {
  const { options, loading, error, fetchData } = useLookupData(
    fetchFunction,
    mapOption,
  );

  const { open, handleOpen, handleClose } = useModal();

  const onSelectOption = (data: IOption | null) => {
    if (data?.name === `Create ${label}`) {
      setValue(name, null); // Clear form value
      return;
    }
    setValue(name, data); // Update form value with selected option
  };

  const onSuccessCreateNewItem = () => {
    handleClose();
    fetchData(""); // Refresh options after new item creation
  };

  const onSearchProduct = debounce((searchTerm: string) => {
    fetchData(searchTerm);
  }, 300);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              {...field}
              className={className}
              options={[{ name: `Create ${label}` }, ...options]}
              loading={loading}
              getOptionLabel={(option) => option?.name || ""}
              onChange={(_, value) => onSelectOption(value)}
              isOptionEqualToValue={(option, value) =>
                option?._id === value?._id
              }
              onInputChange={(event, value, reason) => {
                console.log(event, value, reason);
                // write debounc search
                if (reason === "input") {
                  onSearchProduct(value);
                }
              }}
              renderOption={(props, option) =>
                option?.name === `Create ${label}` ? (
                  <Button
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={handleOpen}
                  >
                    <AddCircle className="mr-2" />
                    Create New
                  </Button>
                ) : (
                  <li {...props}>{option?.name}</li>
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={!!error}
                  // helperText={error ? error.message : ""}
                  inputProps={{
                    ...params.inputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            {error && (
              <FormHelperText sx={{ color: error?.message ? "#d32f2f" : "" }}>
                {error?.message}
              </FormHelperText>
            )}
          </>
        )}
      />
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <CreateModalComponent onSuccess={onSuccessCreateNewItem} />
        </Box>
      </MuiModal>
    </>
  );
};

export default LookupDropdown;

/**
 * 
 * 
import { getBrands } from "@/services/product/brandService";
import { useForm } from "react-hook-form";
import LookupDropdown from "@/components/LookupDropdown";
import CategoryBrandCreate from "@/components/CategoryBrandCreate";

const form = useForm();

const mapBrand = (item: any) => ({
  name: item.brandName,
  _id: item.id,
  description: item.brandDescription,
});

<LookupDropdown
  label="Brand"
  control={form.control}
  name="brand"
  setValue={form.setValue}
  fetchFunction={getBrands}
  mapOption={mapBrand}
  createType="brand"
  CreateModalComponent={(props) => (
    <CategoryBrandCreate type="brand" {...props} />
  )}
/>;


 */
