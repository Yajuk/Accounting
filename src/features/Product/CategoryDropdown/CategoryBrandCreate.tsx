import CustomForm, { IField } from "@/components/ui/CustomForm/CustomForm";
import CustomSnackbar, {
  useSnackBar,
} from "@/components/ui/CustomSnackbar/CustomSnackbar";
import { createBrand } from "@/services/product/brandService";
import { createCategory } from "@/services/product/CategoryService";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(6),
  description: z.string().optional(),
});

const fields: IField[] = [
  {
    field: "text",
    name: "name",
    label: "Name",
  },
  {
    field: "text",
    name: "description",
    label: "Description",
  },
];

interface ICategoryBrandProps {
  type: "brand" | "category" | "customer";
  onSuccess: () => void;
}

const title = {
  brand: "Create Brand",
  category: "Create Category",
  customer: "Create Customer",
};

const CategoryBrandCreate = ({ type, onSuccess }: ICategoryBrandProps) => {
  const { severity, snackbarMessage, open, handleClose, openSnackbar } =
    useSnackBar();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("formValues", data);
    try {
      const createFunction = type === "category" ? createCategory : createBrand;
      const response = await createFunction({
        name: data.name,
        description: data.description || "",
      });

      if (response.statusCode === 200) {
        openSnackbar("Created successfully", "success");
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

  return (
    <Card>
      <CardHeader title={title[type]} />
      <CardContent>
        <CustomForm fields={fields} schema={formSchema} onSubmit={onSubmit} />
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

export default CategoryBrandCreate;
