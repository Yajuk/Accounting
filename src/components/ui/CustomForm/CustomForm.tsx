import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { BRAND } from "zod";
import FormTextField, { FormFieldProps } from "../FormTextField/FormTextField";
import FormSelect, { FormSelectProps } from "../FomSelect/FormSelect";
import CategoryDropdown, {
  IProps,
} from "@/features/Product/CategoryDropdown/CtaegoryDropdown";
import { Grid, RegularBreakpoints, GridSpacing, Button } from "@mui/material";

export const FieldTypes = {
  TEXT: "text",
  SELECT: "select",
  COMBOBOX: "combobox",
  PRODUCT_DD: "product-dd",
  CATEGORY_DD: "category-dd",
  BRAND_DD: "brand-dd",
};

type UIFormFields =
  | Omit<FormFieldProps<string>, "control">
  | Omit<FormSelectProps<string>, "control">
  | Omit<IProps, "control">;

export type IField = UIFormFields & {
  field:
    | "text"
    | "select"
    | "combobox"
    | "product-dd"
    | "category-dd"
    | "brand-dd";
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

      if (field.field === FieldTypes.COMBOBOX) {
        acc[field.name as string] = field.defaultValue || "";
      }
      if (field.field === FieldTypes.PRODUCT_DD) {
        acc[field.name as string] = field.defaultValue || "";
      }
      if (field.field === FieldTypes.CATEGORY_DD) {
        acc[field.name as string] = field.defaultValue || {};
      }
      if (field.field === FieldTypes.BRAND_DD) {
        acc[field.name as string] = field.defaultValue || {};
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
  const { handleSubmit, control, reset, setValue } = useForm({
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
        case FieldTypes.CATEGORY_DD:
          return (
            <CategoryDropdown
              setValue={setValue}
              type="category"
              control={control}
              name="category"
            />
          );
        case FieldTypes.BRAND_DD:
          return (
            <CategoryDropdown
              setValue={setValue}
              type="brand"
              control={control}
              name="brand"
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
