"use client";
import { getCategories } from "@/services/product/CategoryService";
import { getBrands } from "@/services/product/brandService";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  useColorScheme,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IOption {
  name: string;
  description: string;
}

interface IProps {
  type: "brand" | "category";
}

const CategoryDropdown = ({ type }: IProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IOption[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    if (type === "brand") {
      getBrands().then((data) => {
        if (active) {
          setOptions(data.data);
        }
      });
    } else {
      getCategories().then((data) => {
        if (active) {
          setOptions(data.data);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [open]);

  return (
    <Autocomplete
      openOnFocus={true}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Category"
            variant="outlined"
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
  );
};

export default CategoryDropdown;
