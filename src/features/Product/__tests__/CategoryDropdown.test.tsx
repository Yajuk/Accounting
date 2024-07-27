import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryDropdown from "../CategoryDropdown/CtaegoryDropdown";
import { getCategories } from "@/services/product/CategoryService";
import { getBrands } from "@/services/product/brandService";
import { act } from "react-dom/test-utils";
import { useForm } from "react-hook-form";

jest.mock("../../../services/product/CategoryService");
jest.mock("../../../services/product/brandService");

const mockSetValue = jest.fn();

const WithDropdown = ({
  setValue,
  type,
  name,
}: {
  setValue: any;
  type: "brand" | "category";
  name: string;
}) => {
  const { control } = useForm();
  return (
    <>
      <CategoryDropdown
        type={type}
        control={control}
        name={name}
        setValue={setValue}
      />
    </>
  );
};

const mockOptions = [
  { name: "Category 1", description: "Description 1", _id: "1" },
  { name: "Category 2", description: "Description 2", _id: "2" },
];

describe("CategoryDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCategories as jest.Mock).mockClear();
  });

  it("renders category dropdown with options", async () => {
    // This is a test case that checks if the category dropdown renders with options
    const mockgetCategories = getCategories as jest.Mock; // Create a mock for the getCategories function
    mockgetCategories.mockResolvedValue({
      // Mock the resolved value of the getCategories function
      data: mockOptions, // Set the data property to mockOptions
      statusCode: 200, // Set the statusCode property to 200
    });

    const { container } = render(
      // Render the WithDropdown component
      <WithDropdown setValue={mockSetValue} type="category" name="category" />,
    );

    act(() => {
      // Use the act function to handle asynchronous updates
      new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockgetCategories).toHaveBeenCalledTimes(1); // Expect the mockgetCategories function to be called once

    const categoryInput = screen.getByRole("combobox", { name: /category/i }); // Get the category input element by its role and name

    expect(categoryInput).toBeInTheDocument(); // Expect the category input element to be in the document

    fireEvent.change(categoryInput, { target: { value: "Category 1" } }); // Simulate a change event on the category input with the value "Category 1"

    const options = await screen.findAllByRole("option"); // Wait for and get all the option elements
    screen.debug(options); // Log the options for debugging purposes

    fireEvent.click(options[0]); // Simulate a click event on the first option
    expect(options[0]).toHaveTextContent("Category 1"); // Expect the first option to have the text content "Category 1"
    expect(categoryInput).toHaveValue("Category 1"); // Expect the category input to have the value "Category 1"
    expect(mockSetValue).toHaveBeenCalledTimes(1); // Expect the mockSetValue function to be called once
    expect(mockSetValue).toHaveBeenCalledWith("category", {
      // Expect the mockSetValue function to be called with the arguments "category" and an object
      _id: "1",
      description: "Description 1",
      name: "Category 1",
    });
  });

  it("renders brand dropdown with options", async () => {
    const mockgetBrands = getBrands as jest.Mock;
    mockgetBrands.mockResolvedValue({ data: mockOptions });

    render(<WithDropdown setValue={mockSetValue} type="brand" name="brand" />);

    act(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
    });
    const brandInput = screen.getByRole("combobox", { name: /brand/i });
    expect(brandInput).toBeInTheDocument();
    act(() => {
      fireEvent.change(brandInput, { target: { value: "Category 1" } });
    });

    const options = await screen.findAllByRole("option");
    screen.debug(options);
    expect(options).toHaveLength(mockOptions.length); // +1 for "Create product" option
    fireEvent.click(options[0]);
    expect(options[0]).toHaveTextContent("Category 1");
    expect(brandInput).toHaveValue("Category 1");
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith("brand", {
      _id: "1",
      description: "Description 1",
      name: "Category 1",
    });
  });

  it("shows 'Create New' button for 'Create product' option", async () => {
    (getCategories as jest.Mock).mockResolvedValue({ data: mockOptions });

    render(
      <WithDropdown type="category" name="category" setValue={mockSetValue} />,
    );

    const categoryInput = screen.getByRole("combobox", { name: /category/i });
    fireEvent.mouseDown(categoryInput);
    const createNewButton = await screen.findByRole("button", {
      name: /create new/i,
    });
    expect(createNewButton).toBeInTheDocument();
  });
});
