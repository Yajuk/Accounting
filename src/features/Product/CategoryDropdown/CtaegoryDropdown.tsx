import MuiModal, { useModal } from "@/components/ui/FormTextField/MuiModal";
import { getCategories } from "@/services/product/CategoryService";
import { getBrands } from "@/services/product/brandService";
import { AddCircle } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CategoryBrandCreate from "../CategoryBrandCreate";

interface IOption {
  name: string;
  description: string;
  _id: string;
}

export interface IProps {
  type: "brand" | "category";
  control: any; // Object from useForm hook
  name: string; // Name of the field in the form
  setValue: any; // Function to set the value of the field in the form
  className?: string; // Class name to be applied to the component
}

const CategoryDropdown = ({
  type,
  control,
  name,
  setValue,
  className = "",
}: IProps) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { open, handleOpen, handleClose } = useModal();
  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const getFunction = type === "category" ? getCategories : getBrands;
      const data = await getFunction();
      setOptions(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]); // Re-fetch data on type change

  const onSelectOption = (data: IOption | null) => {
    if (data?.name === "Create product") {
      setValue(name, null); // Clear form value
      return;
    }
    setValue(name, data); // Update form value with selected option
  };

  const onSuccessCreateNewCategoryOrBrand = useCallback(() => {
    handleClose();
    fetchData();
  }, [type]);

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
              options={[{ name: "Create product" }, ...options]}
              loading={loading}
              getOptionLabel={(option) => option?.name || ""}
              onChange={(_, value) => onSelectOption(value)}
              isOptionEqualToValue={(option, value) =>
                option?._id === value?._id
              }
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
                    label={type === "brand" ? "Brand" : "Category"}
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
            {error && (
              <FormHelperText
                sx={{ color: error.name.message ? "#d32f2f" : "" }}
              >
                {error.name.message}
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
          <CategoryBrandCreate
            type="category"
            onSuccess={onSuccessCreateNewCategoryOrBrand}
          />
        </Box>
      </MuiModal>
    </>
  );
};

export default CategoryDropdown;
