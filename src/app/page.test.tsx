import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Page from "./page";

describe("Page", () => {
  it("renders a h2", () => {
    const { container } = render(<Page />);

    const heading = container.querySelector("h2");

    if (heading) {
      //console.log(prettyDOM(heading));
      expect(heading).toBeInTheDocument();
    }
  });
});
describe("Page", () => {
  it("renders a Link component with href='/chat'", () => {
    const { container } = render(<Page />);
    const chatLink = container.querySelector("a[href='/chat']");
    expect(chatLink).toBeInTheDocument();
  });

  it("renders a Link component with href='/product'", () => {
    const { container } = render(<Page />);
    const productLink = container.querySelector("a[href='/product']");
    expect(productLink).toBeInTheDocument();
  });

  it("renders two Link components", () => {
    const { container } = render(<Page />);
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(2);
  });

  it("renders Link components with correct text content", () => {
    const { container } = render(<Page />);
    const chatLink = container.querySelector("a[href='/chat']");
    const productLink = container.querySelector("a[href='/product']");
    expect(chatLink?.textContent).toBe("Chat");
    expect(productLink?.textContent).toBe("Product");
  });

  it("renders Link components with correct styles", () => {
    const { container } = render(<Page />);
    const chatLink = container.querySelector("a[href='/chat']");
    const productLink = container.querySelector("a[href='/product']");
    expect(chatLink).toHaveClass("bg-white p-6 rounded-lg shadow");
    expect(productLink).toHaveClass("bg-white p-6 rounded-lg shadow");
  });
});
