import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Page from "./page";

describe("Page", () => {
  it("renders a heading", () => {
    const { container } = render(<Page />);

    const heading = container.querySelector("h2");

    if (heading) {
      console.log(prettyDOM(heading));
      expect(heading).toBeInTheDocument();
    }
  });
});
