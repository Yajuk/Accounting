import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import UserItem from "../../Users/UserItem";

describe("UserItem", () => {
  it("should render name", () => {
    const { container, getByText } = render(
      <UserItem
        user={{
          name: "Test",
          email: "test@test.com",
          _id: "1",
        }}
      />,
    );

    screen.debug();

    expect(container).toBeInTheDocument();
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render email", () => {
    const { container, getByText } = render(
      <UserItem
        user={{
          name: "Test",
          email: "test@test.com",
          _id: "1",
        }}
      />,
    );
    expect(getByText("test@test.com")).toBeInTheDocument();
  });
});
