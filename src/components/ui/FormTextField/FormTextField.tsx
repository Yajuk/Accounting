"use client";

import { Controller, FieldValues } from "react-hook-form";
import { TextField, FormControl, InputBaseComponentProps } from "@mui/material";
export interface FormFieldProps<T> {
  name: string;
  control: any; // Type for 'control' from react-hook-form
  label: string;
  type?: string;
  helperText?: string;
  inputProps?: InputBaseComponentProps;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  inputProps,
  className = "",
  ...rest
}: FormFieldProps<T>) => (
  <Controller
    name={name as string}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl className={"form-control " + className} fullWidth>
        <TextField
          label={label}
          type={type}
          variant="outlined"
          //className="mb-4"
          error={!!error}
          helperText={error ? error.message : ""}
          {...field}
          {...rest}
          inputProps={inputProps}
        />
      </FormControl>
    )}
  />
);

export default FormField;
