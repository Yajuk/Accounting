import { Controller, FieldValues } from "react-hook-form";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface FormSelectProps<T> {
  name: keyof T;
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
          value={field.value || defaultValue}
          onChange={field.onChange}
          label={label}
        >
          {options.map((option) => (
            <MenuItem
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

export default FormSelect;
