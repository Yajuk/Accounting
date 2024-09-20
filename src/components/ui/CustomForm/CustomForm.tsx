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
import LookupDropdown from "@/features/Product/LookupDropdown/LookupDropdown";
import { lookups } from "@/services/product/lookupService";

export const FieldTypes = {
  TEXT: "text",
  SELECT: "select",
  COMBOBOX: "combobox",
  PRODUCT_DD: "product-dd",
  CATEGORY_DD: "category-dd",
  BRAND_DD: "brand-dd",
  LOOKUP: "lookup",
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
    | "brand-dd"
    | "lookup";
  defaultValue?: any;
  name: string;
  model?: string;
  label: string;
  CreateComponent?: React.ComponentType<{
    onSuccess: () => void;
  }>;
};

interface IFormProps<T extends z.ZodType<any, any>> {
  fields: IField[];
  breakpoints?: RegularBreakpoints;
  spacing?: GridSpacing;
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
}

/**
 * Generates the default values for the form fields based on the provided `IField` array.
 *
 * @param fields - An array of `IField` objects representing the form fields.
 * @returns An object containing the default values for each form field.
 */
const generateDefaultValues = (fields: IField[]) => {
  const defaultValues = fields.reduce(
    (acc, field) => {
      const commonTextFields = [
        FieldTypes.TEXT,
        FieldTypes.SELECT,
        FieldTypes.COMBOBOX,
        FieldTypes.PRODUCT_DD,
      ];

      const commonObjectFields = [FieldTypes.CATEGORY_DD, FieldTypes.BRAND_DD];

      if (commonTextFields.includes(field.field)) {
        acc[field.name as string] = field.defaultValue || "";
      }

      if (commonObjectFields.includes(field.field)) {
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
      const { name, label, field, model, CreateComponent } = fieldData;
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

        case FieldTypes.LOOKUP:
          return (
            <LookupDropdown
              label={label}
              control={control}
              name={name}
              setValue={setValue}
              fetchFunction={async () => {
                const response = await lookups({ model: model as string });
                return response.data;
              }}
              CreateModalComponent={(props) =>
                CreateComponent ? <CreateComponent {...props} /> : null
              }
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
