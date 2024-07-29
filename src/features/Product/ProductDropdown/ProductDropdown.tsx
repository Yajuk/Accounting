import { Controller } from "react-hook-form";

import { getProducts } from "@/services/product/productService";
import { debounce } from "@/utils/debounce";
import { AddCircle } from "@mui/icons-material";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import MuiModal from "@/components/ui/FormTextField/MuiModal";
import CreateProductForm from "./ProductCreate";

interface IOption {
  name: string;
  description: string;
  _id: string;
}

interface IProps {
  control: any; // Object from useForm hook
  name: string; // Name of the field in the form
  setValue: any; // Function to set the value of the field in the form
  className?: string; // Class name to be applied to the component
}

const ProductDropdown = ({
  control,
  name,
  setValue,
  className = "",
}: IProps) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async (search: string) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const data = await getProducts({ search });
      setOptions(data.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectOption = (data: IOption | null) => {
    if (data?.name === "Create product") {
      setValue(name, null); // Clear form value
      //alert("Not implemented yet!");
      handleOpen();
      return;
    }
    setValue(name, data); // Update form value with selected option
  };

  const onSearchProduct = debounce((searchTerm: string) => {
    fetchData(searchTerm);
  }, 300);

  const onSuccessCreateNewProduct = useCallback(() => {
    handleClose();
    const searchTerm = "";
    fetchData(searchTerm);
  }, []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            className={className}
            options={[{ name: "Create product" }, ...options]}
            loading={loading}
            getOptionLabel={(option) => option?.name || ""}
            onChange={(_, value) => onSelectOption(value)}
            onInputChange={(event, value, reason) => {
              console.log(event, value, reason);
              // write debounc search
              if (reason === "input") {
                onSearchProduct(value);
              }
            }}
            isOptionEqualToValue={(option, value) => option?._id === value?._id}
            renderOption={(props, option) =>
              option?.name === "Create product" ? (
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
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={"Products"}
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
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
              );
            }}
          />
        )}
      />
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <CreateProductForm onSuccess={onSuccessCreateNewProduct} />
        </Box>
      </MuiModal>
    </>
  );
};

export default ProductDropdown;
