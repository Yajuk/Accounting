import { apiClient } from "@/config/apiClient";
import { z } from "zod";
import { NATURES } from "@/constants";

export const ledgerSchema = z.object({
  ledgerName: z.string().min(1, "Ledger name is required"),
  groupID: z.string(),
  nature: z.enum(NATURES as [string, ...string[]]).optional(),
  alias: z.string().optional(),
  billByBill: z.boolean(),
  narration: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  website: z.string().url("Invalid URL").optional(),
  openingBalance: z.number(),
  maintainBalances: z.boolean().optional(),
  creditPeriod: z.number().int().positive().optional(),
  checkForCreditDays: z.boolean().optional(),
  inventoryValuesAffected: z.boolean(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Invalid PIN code")
    .optional(),
  panItNo: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .optional(),
  gstNo: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number",
    )
    .optional(),
  bankName: z.string().optional(),
  bankAccountNo: z.string().optional(),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .optional(),
  exciseDetails: z.boolean().optional(),
  vatDetails: z.boolean().optional(),
});

type ILedgerPayload = z.infer<typeof ledgerSchema>;
export type ILedger = ILedgerPayload & { _id: string };

export const createLedger = async (payload: ILedgerPayload) => {
  try {
    const response = await apiClient({
      url: "/ledger",
      method: "POST",
      data: { ...payload },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLedgers = async () => {
  try {
    const response = await apiClient({
      url: "/ledgers",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
