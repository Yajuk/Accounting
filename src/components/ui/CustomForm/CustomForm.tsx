import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormTextField, { FormFieldProps } from "../FormTextField/FormTextField";
import FormSelect, { FormSelectProps } from "../FomSelect/FormSelect";
import { Grid, RegularBreakpoints, GridSpacing, Button } from "@mui/material";

export const FieldTypes = {
  TEXT: "text",
  SELECT: "select",
  COMBOBOX: "combobox",
};

type UIFormFields =
  | Omit<FormFieldProps<string>, "control">
  | Omit<FormSelectProps<string>, "control">;

export type IField = UIFormFields & {
  field: "text" | "select" | "combobox";
  defaultValue?: any;
};

interface IFormProps<T extends z.ZodType<any, any>> {
  fields: IField[];
  breakpoints?: RegularBreakpoints;
  spacing?: GridSpacing;
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
}

const generateDefaultValues = (fields: IField[]) => {
  const defaultValues = fields.reduce(
    (acc, field) => {
      if (field.field === FieldTypes.TEXT) {
        acc[field.name as string] = field.defaultValue || "";
      }

      if (field.field === FieldTypes.SELECT) {
        acc[field.name as string] = field.defaultValue || "";
      }

      return acc;
    },
    {} as Record<string, any>,
  );
  console.log("Form Default values", fields, defaultValues);
  return defaultValues;
};

const CustomForm = <T extends z.ZodType<any, any>>({
  fields,
  breakpoints,
  spacing = 1,
  schema,
  onSubmit,
}: IFormProps<T>) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: generateDefaultValues(fields),
    resolver: zodResolver(schema),
  });

  const onSubmitForm = async (data: z.infer<T>) => {
    console.log(data);
    onSubmit(data);
  };

  const renderFormField = useCallback(
    (fieldData: IField) => {
      const { name, label, field } = fieldData;
      switch (field) {
        case FieldTypes.TEXT:
          return <FormTextField control={control} name={name} label={label} />;
        case FieldTypes.SELECT:
          const { options } = fieldData as Omit<
            FormSelectProps<string>,
            "control"
          >;
          return (
            <FormSelect
              control={control}
              name={name as string}
              label={label}
              options={options}
            />
          );
        default:
          return null;
      }
    },
    [control],
  );
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Grid container spacing={spacing}>
        {fields.map((fieldData) => {
          return (
            <Grid key={fieldData.name} item {...breakpoints}>
              {renderFormField(fieldData)}
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        <Grid item>
          <Button type="submit"> Submit</Button>
        </Grid>
        <Grid item>
          <Button title="Reset" onClick={reset}>
            {" "}
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomForm;
