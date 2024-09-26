import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define types for the item details
interface Item {
  itemName: {
    name: string;
  };
  quantity: number;
  rate: number;
  gst: number;
}

// Define types for the supplier details
interface Supplier {
  _id: string;
  name: string;
}

// Define the data structure for the purchase voucher form
interface PurchaseVoucherData {
  invoiceNumber: string;
  date: string;
  supplier: Supplier;
  items: Item[];
  totalAmount: number;
  applyGST: boolean;
  totalGST: number;
  cgst: number;
  sgst: number;
}

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
  },
  header: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    borderBottom: "2px solid #000",
    paddingBottom: 10,
  },
  section: {
    margin: 10,
    padding: 5,
  },
  supplierDetails: {
    marginBottom: 10,
    fontSize: 10,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
  },
  tableCol: {
    padding: 5,
    textAlign: "left",
    width: "20%",
    fontSize: 8,
  },
  tableHeader: {
    backgroundColor: "#e6e6e6",
    fontWeight: "bold",
    borderBottom: "2px solid #000",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingTop: 5,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressDetails: {
    fontSize: 8,
    marginBottom: 3,
  },
  invoiceTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  labelValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  companySection: {
    marginBottom: 15,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  supplierSection: {
    marginTop: 15,
  },
});

// Create the PDF document
const PrintableBillDocument: React.FC<{ data: PurchaseVoucherData }> = ({
  data,
}) => {
  const totalAmountWithGST = data.applyGST
    ? data.totalAmount + data.totalGST
    : data.totalAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <Text style={styles.invoiceTitle}>Purchase Bill</Text>
        {/* Company Details Section */}
        <View style={styles.companySection}>
          <Text style={styles.companyName}>Your Company Name</Text>
          <Text style={styles.addressDetails}>
            123 Company Street, City, State, ZIP
          </Text>
          <Text style={styles.addressDetails}>
            Phone: (123) 456-7890 | Email: info@yourcompany.com
          </Text>
        </View>
        {/* Supplier Details */}
        <View style={styles.supplierSection}>
          <Text style={styles.supplierDetails}>Supplier Details:</Text>
          <Text>Name: {data.supplier.name}</Text>
          <Text>ID: {data.supplier._id}</Text>
        </View>

        <View style={styles.labelValue}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text>{data.invoiceNumber}</Text>
        </View>
        <View style={styles.labelValue}>
          <Text style={styles.label}>Date:</Text>
          <Text>{data.date}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text>Items:</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Item Name</Text>
              <Text style={styles.tableCol}>Quantity</Text>
              <Text style={styles.tableCol}>Rate</Text>
              <Text style={styles.tableCol}>GST %</Text>
              <Text style={styles.tableCol}>Amount</Text>
            </View>
            {data.items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.itemName.name}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.rate.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{item.gst}%</Text>
                <Text style={styles.tableCol}>
                  ₹{(item.quantity * item.rate).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* GST Details */}
        {data.applyGST && (
          <View style={styles.section}>
            <Text>GST Details:</Text>
            <View style={styles.totalRow}>
              <Text>CGST (50% of Total GST):</Text>
              <Text>{data.cgst.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>SGST (50% of Total GST):</Text>
              <Text>{data.sgst.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Total GST:</Text>
              <Text>{data.totalGST.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Total Amount */}
        <View style={styles.section}>
          <View style={styles.totalRow}>
            <Text style={styles.totalAmount}>Total Amount:</Text>
            <Text style={styles.totalAmount}>
              {totalAmountWithGST.toFixed(2)}
            </Text>
          </View>
        </View>
        <Text style={styles.invoiceTitle}>Purchase Bill</Text>
        {/* Company Details Section */}
        <View style={styles.companySection}>
          <Text style={styles.companyName}>Your Company Name</Text>
          <Text style={styles.addressDetails}>
            123 Company Street, City, State, ZIP
          </Text>
          <Text style={styles.addressDetails}>
            Phone: (123) 456-7890 | Email: info@yourcompany.com
          </Text>
        </View>
        {/* Supplier Details */}
        <View style={styles.supplierSection}>
          <Text style={styles.supplierDetails}>Supplier Details:</Text>
          <Text>Name: {data.supplier.name}</Text>
          <Text>ID: {data.supplier._id}</Text>
        </View>

        <View style={styles.labelValue}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text>{data.invoiceNumber}</Text>
        </View>
        <View style={styles.labelValue}>
          <Text style={styles.label}>Date:</Text>
          <Text>{data.date}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text>Items:</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Item Name</Text>
              <Text style={styles.tableCol}>Quantity</Text>
              <Text style={styles.tableCol}>Rate</Text>
              <Text style={styles.tableCol}>GST %</Text>
              <Text style={styles.tableCol}>Amount</Text>
            </View>
            {data.items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.itemName.name}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.rate.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{item.gst}%</Text>
                <Text style={styles.tableCol}>
                  ₹{(item.quantity * item.rate).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* GST Details */}
        {data.applyGST && (
          <View style={styles.section}>
            <Text>GST Details:</Text>
            <View style={styles.totalRow}>
              <Text>CGST (50% of Total GST):</Text>
              <Text>{data.cgst.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>SGST (50% of Total GST):</Text>
              <Text>{data.sgst.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Total GST:</Text>
              <Text>{data.totalGST.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Total Amount */}
        <View style={styles.section}>
          <View style={styles.totalRow}>
            <Text style={styles.totalAmount}>Total Amount:</Text>
            <Text style={styles.totalAmount}>
              {totalAmountWithGST.toFixed(2)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Define the PrintableBill component
const PrintableBill: React.FC<{ data: PurchaseVoucherData }> = ({ data }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "600px" }}>
      <PrintableBillDocument data={data} />
    </PDFViewer>
  );
};

export default PrintableBill;
