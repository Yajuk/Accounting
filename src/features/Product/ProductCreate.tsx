"use client";
import CustomSnackbar, {
  useSnackBar,
} from "@/components/ui/CustomSnackbar/CustomSnackbar";
import FormSelect from "@/components/ui/FomSelect/FormSelect";
import FormTextField from "@/components/ui/FormTextField/FormTextField";
import CategoryDropdown from "@/features/Product/CategoryDropdown/CtaegoryDropdown";
import { createProduct } from "@/services/product/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const UNITS = ["kg", "gm", "litre", "ml", "piece"];
export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" }),
  description: z.string().optional(),
  unit: z.enum(["kg", "gm", "litre", "ml", "piece"]),
  price: z
    .number()
    .positive()
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/)),
  category: z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
  brand: z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
});
type IFormInput = z.infer<typeof productSchema>;

const CreateProductForm = () => {
  const { severity, snackbarMessage, open, handleClose, openSnackbar } =
    useSnackBar();

  const {
    control,
    handleSubmit,
    formState: { errors, ...restFormState },
    setValue,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      description: "",
      category: {},
      brand: {},
      unit: "litre",
      price: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("formValues", data);
    try {
      const response = await createProduct({
        name: data.name,
        description: data.description || "",
        unit: data.unit,
        price: data.price,
        category: data.category._id,
        image: "",
        brand: data.brand._id,
      });
      console.log("response", response);
      if (response.statusCode === 200) {
        openSnackbar("Product created successfully", "success");
        reset();
      }
    } catch (error: any) {
      const errorMessage =
        error?.errors?.[0]?.message ||
        error?.errors?.message ||
        "An unexpected error occurred. Please try again later.";
      openSnackbar(errorMessage, "error");
      console.error(errorMessage);
    }
  };

  console.log("errors", errors);
  return (
    <>
      <Card>
        <CardHeader title="Create Product" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
                <FormTextField
                  name={"name"}
                  control={control}
                  label={"Product Name"}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <FormSelect
                  control={control}
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "gm", label: "gm" },
                    { value: "litre", label: "litre" },
                    { value: "ml", label: "ml" },
                    { value: "piece", label: "piece" },
                  ]}
                  name="unit"
                  label="Unit"
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <FormTextField
                  type="number"
                  name={"price"}
                  control={control}
                  label={"Price"}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <CategoryDropdown
                  setValue={setValue}
                  type="category"
                  control={control}
                  name="category"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <CategoryDropdown
                  setValue={setValue}
                  type="brand"
                  control={control}
                  name="brand"
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <FormTextField
                  name={"description"}
                  control={control}
                  label={"Description"}
                  multiline={true}
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid className="flex justify-center mt-4">
              <Grid item md={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="text-white py-2 px-4 my-4 rounded"
                  size="medium"
                  data-testId="create-product-button"
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {open && (
        <CustomSnackbar
          message={snackbarMessage}
          severity={severity}
          open={open}
          onClose={handleClose}
          action={<Button onClick={handleClose}>Dismiss</Button>}
        />
      )}
    </>
  );
};

export default CreateProductForm;
