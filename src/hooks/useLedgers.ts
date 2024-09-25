import * as LedgerService from "@/services/product/ledgerService";
import { useEffect, useState } from "react";

const useLedger = () => {
  const [ledgersOptions, setLedgerOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getLedgers = async () => {
    try {
      const response = await LedgerService.getLedgers();
      if (response.success) {
        const ledgers = response.data.data;
        const ledgerOptions = ledgers.map((ledger: LedgerService.ILedger) => ({
          label: ledger.ledgerName,
          value: ledger._id,
        }));
        setLedgerOptions(ledgerOptions);
      }
    } catch (error) {
      console.error("Error fetching ledgers:", error);
    }
  };

  const getLedger = (ledgerName: string) => {
    return ledgersOptions.find((ledger) => ledger.label === ledgerName);
  };

  useEffect(() => {
    getLedgers();
  }, []);

  return { ledgersOptions, getLedgers, getLedger };
};

export default useLedger;
