import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  borderRadius: "16px",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      "0 15px 20px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -4px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: "20px",
  fontWeight: "bold",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    transform: "scale(1.01)",
  },
}));

const ProductDetails = ({ product }: any) => {
  debugger;
  return (
    <Box className="container mx-auto p-2" sx={{ maxWidth: "900px" }}>
      <StyledCard>
        <CardContent sx={{ padding: "1.5rem" }}>
          <Box sx={{ marginBottom: "1rem", textAlign: "right" }}>
            <Typography
              variant="caption"
              display="block"
              sx={{ color: "#95a5a6", fontSize: "0.7rem" }}
            >
              Created: {new Date(product.createdAt).toLocaleString()}
              <br />
              Last Updated: {new Date(product.updatedAt).toLocaleString()}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.75rem",
                  color: "#2c3e50",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#7f8c8d",
                  marginBottom: "1rem",
                  lineHeight: 1.6,
                  textAlign: "justify",
                }}
              >
                {product.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    color: "#16a085",
                    textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.1)",
                  }}
                >
                  Price: ₹{product.price}/{product.unit}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#34495e", marginBottom: "0.5rem" }}
                >
                  HSN: {product.hsn} | GST: {product.gst}%
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <StyledChip
                    label={`Category: ${product.category.name}`}
                    variant="outlined"
                    sx={{ backgroundColor: "#ecf0f1" }}
                  />
                  <StyledChip
                    label={`Brand: ${product.brand.name}`}
                    variant="outlined"
                    sx={{ backgroundColor: "#ecf0f1" }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#34495e", marginBottom: "0.75rem" }}
                >
                  Quantity in Stock: {product.quantity} {product.unit}s
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "1.5rem" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "#2c3e50",
                textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.1)",
              }}
            >
              Batches:
            </Typography>
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <List>
                {product.batches.map((batch: any) => (
                  <StyledListItem
                    key={batch._id}
                    sx={{
                      borderBottom: "1px solid #e0e0e0",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "#34495e",
                            textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.05)",
                          }}
                        >
                          Batch No: {batch.batchNo}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ color: "#7f8c8d" }}>
                          <Typography variant="body2">
                            Quantity: {batch.quantity}
                          </Typography>
                          <Typography variant="body2">
                            Expiry Date:{" "}
                            {new Date(batch.expiryDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            Rate: {batch?.rate}/{product.unit}
                          </Typography>
                        </Box>
                      }
                    />
                  </StyledListItem>
                ))}
              </List>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default ProductDetails;
