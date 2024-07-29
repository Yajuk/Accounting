// Import necessary modules and components for testing
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { prettyDOM, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import CreateProductForm from "../ProductDropdown/ProductCreate";
import { createProduct } from "@/services/product/productService";
import { getCategories } from "@/services/product/CategoryService";
import { getBrands } from "@/services/product/brandService";

// Mock the product and category service modules
jest.mock("../../../services/product/productService");
jest.mock("../../../services/product/CategoryService");
jest.mock("../../../services/product/brandService");

// Define the test suite for CreateProductForm component
describe("CreateProductForm", () => {
  // Clear mocks before each test case
  beforeEach(() => {
    (createProduct as jest.Mock).mockClear();
    (getCategories as jest.Mock).mockClear();
    (getBrands as jest.Mock).mockClear();
  });

  // Test case to check if form elements are rendered correctly
  it("renders the form elements correctly", () => {
    // Render the CreateProductForm component
    render(<CreateProductForm />);

    // Store form elements in variables
    const productNameInput = screen.getByLabelText("Product Name");
    const unitInput = screen.getByTestId("Unit");
    const priceInput = screen.getByLabelText("Price");
    const descriptionInput = screen.getByLabelText("Description");
    const createProductButton = screen.getAllByText("Create Product")[0];

    // Assert that form elements are in the document
    expect(productNameInput).toBeInTheDocument();
    expect(unitInput).toBeInTheDocument();
    // expect(screen.getByTestId("Category")).toBeInTheDocument(); // Uncomment if needed
    expect(priceInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(createProductButton).toBeInTheDocument();
  });

  // Test case to check form submission with valid data
  it("submits the form with invalid data", async () => {
    const mockCreateProduct = createProduct as jest.Mock;
    const mockgetCategories = getCategories as jest.Mock;
    mockCreateProduct.mockResolvedValueOnce({ statusCode: 200 });
    mockgetCategories.mockResolvedValueOnce({
      statusCode: 200,
      data: [
        {
          _id: "1",
          name: "Category 1",
          description: "Description 1",
        },
        {
          _id: "2",
          name: "Category 2",
          description: "Description 2",
        },
      ],
    });
    const { container } = render(<CreateProductForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: {
        value: "tt",
      },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "-11.99" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for useEffect to run
    });

    expect(mockgetCategories).toHaveBeenCalledTimes(1);
    fireEvent.change(
      screen.getByRole("combobox", {
        name: /category/i,
      }),
      {
        target: { value: "Category 1" },
      },
    );

    const category2Option = screen.getByRole("option", {
      name: /category 2/i,
    });

    fireEvent.click(category2Option);

    const comboboxCategory = screen.getByRole("combobox", {
      name: /category/i,
    });

    expect(comboboxCategory).toHaveValue("Category 2");

    const submitButton = screen.getByTestId("create-product-button");

    // Fire click event and wait for validation
    fireEvent.click(submitButton);

    // Assert that name error is displayed
    const nameError = await screen.findByText(
      "Product name must be at least 3 characters long",
    );
    expect(nameError).toBeInTheDocument();

    // Assert that price error is displayed
    const priceError = await screen.findByText("Invalid");
    expect(priceError).toBeInTheDocument();
  });
  // Test case to check form submission with valid data
  it("submits form with valid data", async () => {
    const mockCreateProduct = createProduct as jest.Mock;
    const mockgetCategories = getCategories as jest.Mock;
    const mockgetBrands = getBrands as jest.Mock;
    mockgetCategories.mockResolvedValueOnce({
      statusCode: 200,
      data: [
        {
          _id: "1",
          name: "Category 1",
          description: "Description 1",
        },
        {
          _id: "2",
          name: "Category 2",
          description: "Description 2",
        },
      ],
    });
    mockgetBrands.mockResolvedValueOnce({
      statusCode: 200,
      data: [
        {
          _id: "1",
          name: "Brand 1",
          description: "Description 1",
        },
        {
          _id: "2",
          name: "Brand 2",
          description: "Description 2",
        },
      ],
    });

    const { container } = render(<CreateProductForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: {
        value: "Test Product",
      },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "11.99" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for useEffect to run
    });
    expect(mockgetCategories).toHaveBeenCalledTimes(1);
    expect(mockgetBrands).toHaveBeenCalledTimes(1);
    fireEvent.change(
      screen.getByRole("combobox", {
        name: /category/i,
      }),
      {
        target: { value: "Category 1" },
      },
    );
    const category2Option = screen.getByRole("option", {
      name: /category 2/i,
    });

    fireEvent.click(category2Option);

    const comboboxCategory = screen.getByRole("combobox", {
      name: /category/i,
    });
    expect(comboboxCategory).toHaveValue("Category 2");

    // Brnad Dropdown
    fireEvent.change(
      screen.getByRole("combobox", {
        name: /brand/i,
      }),
      {
        target: { value: "Brand 1" },
      },
    );
    const brand2Option = screen.getByRole("option", {
      name: /brand 2/i,
    });

    screen.debug(brand2Option);
    fireEvent.click(brand2Option);
    const comboboxBrand = screen.getByRole("combobox", {
      name: /brand/i,
    });
    expect(comboboxBrand).toHaveValue("Brand 2");
    mockCreateProduct.mockResolvedValue({ statusCode: 200, data: {} });
    const submitButton = screen.getByTestId("create-product-button");

    act(() => {
      fireEvent.click(submitButton);
    });

    //expect(mockCreateProduct).toHaveBeenCalledTimes(1);

    const successMessage = await screen.findByText(
      "Product created successfully",
    );

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalledTimes(1);
    });
    //expect(successMessage).toBeInTheDocument();
  });
});
