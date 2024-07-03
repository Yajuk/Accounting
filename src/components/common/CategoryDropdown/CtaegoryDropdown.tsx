import { Controller, FieldValues } from "react-hook-form";
import { getCategories } from "@/services/product/CategoryService";
import { getBrands } from "@/services/product/brandService";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddCircle, PlusOne } from "@mui/icons-material";

interface IOption {
  name: string;
  description: string;
  _id: string;
}

interface IProps {
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        const data =
          type === "brand" ? await getBrands() : await getCategories();
        setOptions(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]); // Re-fetch data on type change

  const onSelectOption = (data: IOption | null) => {
    if (data?.name === "Create product") {
      setValue(name, null); // Clear form value
      alert("Not implemented yet!");
      return;
    }
    setValue(name, data); // Update form value with selected option
  };

  return (
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
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          renderOption={(props, option) =>
            option?.name === "Create product" ? (
              <Button color="primary" size="small" fullWidth>
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
      )}
    />
  );
};

export default CategoryDropdown;
