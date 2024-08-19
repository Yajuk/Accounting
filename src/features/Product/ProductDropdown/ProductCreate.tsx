"use client";
import CustomSnackbar, {
  useSnackBar,
} from "@/components/ui/CustomSnackbar/CustomSnackbar";
import FormSelect from "@/components/ui/FomSelect/FormSelect";
import FormTextField from "@/components/ui/FormTextField/FormTextField";
import CategoryDropdown from "@/features/Product/CategoryDropdown/CtaegoryDropdown";
import {
  createProduct,
  getProductById,
  updateProductById,
} from "@/services/product/productService";
import { IProductPayload } from "@/utils/types/productTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const UNITS = ["kg", "gm", "litre", "ml", "piece"];
export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" }),
  description: z.string().optional(),
  unit: z.enum(["kg", "gm", "litre", "ml", "piece"]),
  hsn: z
    .number()
    .positive()
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/)),
  gst: z
    .number()
    .positive()
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/)),
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

interface ICreateProductProps {
  productId?: string;
  onSuccess: () => void;
}

const CreateProductForm = ({ productId, onSuccess }: ICreateProductProps) => {
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
      gst: 0,
      hsn: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("formValues", data);
    const payLoad: IProductPayload = {
      name: data.name,
      description: data.description || "",
      unit: data.unit,
      price: data.price,
      category: data.category._id,
      image: "",
      brand: data.brand._id,
      hsn: data.hsn as number,
      gst: data.gst as number,
    };
    try {
      const response = await (productId
        ? updateProductById(productId, payLoad)
        : createProduct(payLoad));
      console.log("response", response);
      if (response.statusCode === 200) {
        openSnackbar(
          `Product ${productId ? "updated" : "created"} successfully`,
          "success",
        );
        reset();
        onSuccess();
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

  const getProductDetails = async (id: string) => {
    try {
      const response = await getProductById(id);
      setValue("name", response.data.name);
      setValue("description", response.data.description);
      setValue("unit", response.data.unit);
      setValue("price", response.data.price);
      setValue("gst", response.data.gst);
      setValue("hsn", response.data.hsn);
      setValue("category", {
        name: response.data.category.name,
        description: response.data.category.description,
        _id: response.data.category._id,
      });
      setValue("brand", {
        name: response.data.brand.name,
        description: response.data.brand.description,
        _id: response.data.brand._id,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (productId) {
      getProductDetails(productId);
    }
  }, []);

  console.log("errors", errors);
  return (
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
            <Grid item md={2} xs={12}>
              <FormTextField
                type="number"
                name={"gst"}
                control={control}
                label={"GST%"}
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <FormTextField
                type="number"
                name={"hsn"}
                control={control}
                label={"HSN Code"}
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
                {productId ? "Update" : "Create Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      {open && (
        <CustomSnackbar
          message={snackbarMessage}
          severity={severity}
          open={open}
          onClose={handleClose}
          action={<Button onClick={handleClose}>Dismiss</Button>}
        />
      )}
    </Card>
  );
};

export default CreateProductForm;
