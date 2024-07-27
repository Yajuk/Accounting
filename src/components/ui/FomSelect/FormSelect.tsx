import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

export interface FormSelectProps<T> {
  name: string;
  control: any; // Type for 'control' from react-hook-form
  label: string;
  options: string[] | { value: string; label: string }[]; // Array of string values or objects with value and label
  defaultValue?: string;
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  defaultValue,
}: FormSelectProps<T>) => (
  <Controller
    name={name as string}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl className="form-control" fullWidth>
        <InputLabel data-testId={label}>{label}</InputLabel>
        <Select
          {...field}
          error={!!error}
          //value={field.value || defaultValue}
          onChange={field.onChange}
          label={label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
            </MenuItem>
          ))}
        </Select>

        {error && (
          <FormHelperText sx={{ color: error.message ? "#d32f2f" : "" }}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default FormSelect;
