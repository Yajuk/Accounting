import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateProductForm from "../ProductCreate";
import { createProduct } from "@/services/product/productService";
import { getCategories } from "@/services/product/CategoryService";
import { prettyDOM } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

jest.mock("../../../services/product/productService");
jest.mock("../../../services/product/CategoryService");
describe("CreateProductForm", () => {
  beforeEach(() => {
    (createProduct as jest.Mock).mockClear();
    (getCategories as jest.Mock).mockClear();
  });

  it("renders the form elements correctly", () => {
    render(<CreateProductForm />);
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByTestId("Unit")).toBeInTheDocument();
    //expect(screen.getByTestId("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getAllByText("Create Product")[0]).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
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
        value: "t",
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

    // screen.logTestingPlaygroundURL();
  });
});
