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
  Checkbox,
  FormControlLabel,
  Typography,
  MenuItem,
  TextField,
  useTheme,
  Divider,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const supplierSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Supplier name must be at least 3 characters long" }),
  under: z.string().nonempty("Please select a ledger group"),
  code: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().optional(),
  openingBalance: z.number().optional(),
  maintainBalances: z.boolean(),
  creditPeriod: z.number().optional(),
  checkForCreditDays: z.boolean(),
  inventoryValuesAffected: z.boolean(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.string().optional(),
  panItNo: z.string().optional(),
  gstNo: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNo: z.string().optional(),
  ifscCode: z.string().optional(),
  exciseDetails: z.boolean(),
  vatDetails: z.boolean(),
});

type IFormInput = z.infer<typeof supplierSchema>;

const defaultValuesWithProperData = {
  name: "Test Supplier",
  under: "Sundry Creditors",
  code: "SUP001",
  contactPerson: "John Doe",
  phone: "+1234567890",
  email: "test@example.com",
  website: "https://www.testsupplier.com",
  openingBalance: 1000,
  maintainBalances: true,
  creditPeriod: 30,
  checkForCreditDays: true,
  inventoryValuesAffected: true,
  address: "123 Test Street, Test City",
  country: "India",
  state: "Test State",
  pinCode: "123456",
  panItNo: "ABCDE1234F",
  gstNo: "22AAAAA0000A1Z5",
  bankName: "Test Bank",
  bankAccountNo: "1234567890",
  ifscCode: "TESTB0000001",
  exciseDetails: true,
  vatDetails: true,
};

const SupplierCreationForm = ({
  supplierId,
  onSuccess,
}: {
  supplierId?: string;
  onSuccess: () => void;
}) => {
  const theme = useTheme();
  const { severity, snackbarMessage, open, handleClose, openSnackbar } =
    useSnackBar();
  const [tabValue, setTabValue] = useState(0);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      under: "Sundry Creditors",
      code: "",
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
      openingBalance: 0,
      maintainBalances: false,
      creditPeriod: 0,
      checkForCreditDays: false,
      inventoryValuesAffected: false,
      address: "",
      country: "India",
      state: "",
      pinCode: "",
      panItNo: "",
      gstNo: "",
      bankName: "",
      bankAccountNo: "",
      ifscCode: "",
      exciseDetails: false,
      vatDetails: false,
    },
    resolver: zodResolver(supplierSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form data:", data);
    const ledgerPayloadForSupplierOrCustomer = {
      ledgerName: data.name,
      groupID: data.under, // Assuming this is the correct group ID for suppliers
      alias: data.code,
      inventoryAffected: data.inventoryValuesAffected,
      billByBill: data.maintainBalances,
      taxDetails: data.gstNo, // Assuming GST number is used for tax details
      narration: "", // Add a field for narration if needed
      contactPerson: data.contactPerson,
      phone: data.phone,
      email: data.email,
      website: data.website,
      openingBalance: data.openingBalance,
      maintainBalances: data.maintainBalances,
      creditPeriod: data.creditPeriod,
      checkForCreditDays: data.checkForCreditDays,
      inventoryValuesAffected: data.inventoryValuesAffected,
      address: data.address,
      country: data.country,
      state: data.state,
      pinCode: data.pinCode,
      panItNo: data.panItNo,
      gstNo: data.gstNo,
      bankName: data.bankName,
      bankAccountNo: data.bankAccountNo,
      ifscCode: data.ifscCode,
      exciseDetails: data.exciseDetails,
      vatDetails: data.vatDetails,
    };

    const ledgerPayload = {
      ledgerName: `${data.name} Purchase Account`,
      groupID: "Purchase Accounts", // Assuming "Purchase Accounts" is the correct group for purchase accounts
      alias: `${data.code}_purchase`,
      inventoryAffected: true,
      billByBill: false,
      narration: `Purchase account for supplier ${data.name}`,
      openingBalance: 0,
      maintainBalances: false,
      inventoryValuesAffected: true,
    };

    console.log(
      "Ledger payload:",
      ledgerPayload,
      ledgerPayloadForSupplierOrCustomer,
    );

    // Submission logic here
    try {
      // Replace this with your actual API call to create the ledger
      // const response = await createLedger(ledgerPayload);
      // if (response.success) {
      //   openSnackbar("Supplier created successfully", "success");
      //   onSuccess();
      // } else {
      //   openSnackbar("Failed to create supplier", "error");
      // }
    } catch (error) {
      console.error("Error creating supplier:", error);
      openSnackbar("An error occurred while creating the supplier", "error");
    }
  };

  const getSupplierDetails = async (id: string) => {
    // Fetch supplier details logic here
  };

  useEffect(() => {
    if (supplierId) {
      getSupplierDetails(supplierId);
    }
  }, [supplierId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card>
      <CardHeader
        title="Ledger Creation"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="supplier form tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 2,
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                minHeight: "48px",
                textTransform: "none",
              },
            }}
          >
            <Tab label="Basic Information" />
            <Tab label="Financial Details" />
            <Tab label="Bank Details" />
            <Tab label="Contact Information" />
            <Tab label="Additional Details" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="name"
                  control={control}
                  label="Name"
                  error={errors.name}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                      <MenuItem value="Sundry Creditors">
                        Sundry Creditors
                      </MenuItem>
                      <MenuItem value="Other Ledger Group">
                        Other Ledger Group
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="code"
                  control={control}
                  label="Supplier Code"
                  error={errors.code}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="contactPerson"
                  control={control}
                  label="Contact Person"
                  error={errors.contactPerson}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="phone"
                  control={control}
                  label="Phone"
                  error={errors.phone}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="email"
                  control={control}
                  label="Email"
                  error={errors.email}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="website"
                  control={control}
                  label="Website"
                  error={errors.website}
                  size="small"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="openingBalance"
                  control={control}
                  label="Opening Balance"
                  type="number"
                  error={errors.openingBalance}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="creditPeriod"
                  control={control}
                  label="Default credit period (days)"
                  type="number"
                  error={errors.creditPeriod}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Controller
                      name="maintainBalances"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} size="small" />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Maintain balances bill-by-bill?
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Controller
                      name="checkForCreditDays"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} size="small" />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Check for credit days?
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Controller
                      name="inventoryValuesAffected"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} size="small" />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Inventory values affected?
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="bankName"
                  control={control}
                  label="Bank Name"
                  error={errors.bankName}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="bankAccountNo"
                  control={control}
                  label="Bank Account No."
                  error={errors.bankAccountNo}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="ifscCode"
                  control={control}
                  label="IFSC Code"
                  error={errors.ifscCode}
                  size="small"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="address"
                  control={control}
                  label="Address"
                  multiline
                  rows={2}
                  error={errors.address}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="country"
                  control={control}
                  label="Country"
                  defaultValue="India"
                  error={errors.country}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="state"
                  control={control}
                  label="State"
                  error={errors.state}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="pinCode"
                  control={control}
                  label="PIN Code"
                  error={errors.pinCode}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="panItNo"
                  control={control}
                  label="PAN / IT No."
                  error={errors.panItNo}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name="gstNo"
                  control={control}
                  label="GST No."
                  error={errors.gstNo}
                  size="small"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Controller
                      name="exciseDetails"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} size="small" />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Set/Alter Excise Details?
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Controller
                      name="vatDetails"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} size="small" />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Set/Alter VAT Details?
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </TabPanel>

          <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="small"
              disabled={!isValid}
            >
              {supplierId ? "Update Supplier" : "Create Supplier"}
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default SupplierCreationForm;
