import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Modal,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface BatchSelectProps {
  control: Control<any>;
  name: string;
  index: number;
  batches: { batchNo: string }[];
  error?: string;
}

const BatchSelect: React.FC<BatchSelectProps> = ({
  control,
  name,
  index,
  batches,
  error,
}) => {
  const [newBatch, setNewBatch] = useState(""); // Track new batch input

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Handle form submission to add new batch
  const handleAddBatch = () => {
    if (newBatch) {
      const newBatchItem = { batchNo: newBatch };
      setBatchList((prev) => [...prev, newBatchItem]);
      setNewBatch(""); // Reset input
      setIsModalOpen(false); // Close modal
    }
  };

  // Modal open/close handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!error}>
            <Select {...field} size="small" displayEmpty>
              <MenuItem value="">None</MenuItem>
              {batches.map((batch, idx) => (
                <MenuItem key={idx} value={batch.batchNo}>
                  {batch.batchNo}
                </MenuItem>
              ))}
              {/* Fixed 'Create New Batch' button in dropdown */}
              <MenuItem
                value="create-new"
                onClick={handleOpenModal}
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Create New Batch
              </MenuItem>
            </Select>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        )}
      />

      {/* Modal for creating a new batch */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create New Batch
          </Typography>
          <TextField
            label="Batch Name"
            size="small"
            value={newBatch}
            onChange={(e) => setNewBatch(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddBatch}
            disabled={!newBatch} // Disable button if input is empty
            fullWidth
          >
            Add Batch
          </Button>
          <Button
            variant="text"
            onClick={handleCloseModal}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BatchSelect;
