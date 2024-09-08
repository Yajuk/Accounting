"use client";
import CustomSnackbar, {
  useSnackBar,
} from "@/components/ui/CustomSnackbar/CustomSnackbar";
import FormTextField from "@/components/ui/FormTextField/FormTextField";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGroups from "@/hooks/useGroups";

const ledgerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Ledger name must be at least 3 characters long" }),
  under: z.string().nonempty("Please select a ledger group"),
  openingBalance: z.number().optional(),
  narration: z.string().optional(),
  inventoryValuesAffected: z.boolean().optional(),
});

type IFormInput = z.infer<typeof ledgerSchema>;

const LedgerCreationForm = ({
  ledgerId,
  onSuccess,
}: {
  ledgerId?: string;
  onSuccess: () => void;
}) => {
  const theme = useTheme();
  const { groupsOptions } = useGroups();
  const { severity, snackbarMessage, open, handleClose, openSnackbar } =
    useSnackBar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      under: "",
      openingBalance: 0,
      narration: "",
      inventoryValuesAffected: false,
    },
    resolver: zodResolver(ledgerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form data:", data);
    const ledgerPayload = {
      ledgerName: data.name,
      groupID: data.under,
      openingBalance: data.openingBalance,
      narration: data.narration,
      inventoryValuesAffected: data.inventoryValuesAffected,
    };

    console.log("Ledger payload:", ledgerPayload);

    try {
      // Replace this with your actual API call to create the ledger
      // const response = await createLedger(ledgerPayload);
      // if (response.success) {
      //   openSnackbar("Ledger created successfully", "success");
      //   onSuccess();
      // } else {
      //   openSnackbar("Failed to create ledger", "error");
      // }
    } catch (error) {
      console.error("Error creating ledger:", error);
      openSnackbar("An error occurred while creating the ledger", "error");
    }
  };

  const getLedgerDetails = async (id: string) => {
    // Fetch ledger details logic here
  };

  useEffect(() => {
    if (ledgerId) {
      getLedgerDetails(ledgerId);
    }
  }, [ledgerId]);

  return (
    <Card>
      <CardHeader
        title="Ledger Creation"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textAlign: "center",
        }}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormTextField
                name="name"
                control={control}
                label="Name"
                error={errors.name}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="under"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Under"
                    error={!!errors.under}
                    helperText={errors.under?.message}
                    size="small"
                    fullWidth
                  >
                    {groupsOptions.map(
                      (option: { value: string; label: string }) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ),
                    )}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormTextField
                name="openingBalance"
                control={control}
                label="Opening Balance"
                type="number"
                error={errors.openingBalance}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormTextField
                name="narration"
                control={control}
                label="Narration"
                multiline
                rows={2}
                error={errors.narration}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="inventoryValuesAffected"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Inventory Values Affected"
                    error={!!errors.inventoryValuesAffected}
                    helperText={errors.inventoryValuesAffected?.message}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="small"
              disabled={!isValid}
            >
              {ledgerId ? "Update Ledger" : "Create Ledger"}
            </Button>
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

export default LedgerCreationForm;
