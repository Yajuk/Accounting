import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  getRoles,
  waitFor,
} from "@testing-library/react";
import * as AccountService from "@/services/account/accountService";
import UsersListWithSearch from "../UsersListWithSearch";
import { act } from "react-dom/test-utils";
import { mocked } from "@storybook/test";

jest.mock("../../../../services/account/accountService.ts");
const mockUsers: AccountService.IUser[] = [
  {
    _id: "1",
    name: "Rahul Patel",
    email: "johndoe@example.com",
  },
  {
    _id: "2",
    name: "Jane Doe",
    email: "janedoe@example.com",
  },
];

describe("UserListWithSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render list of users", async () => {
    const mockedGetUsers = AccountService.getUsers as jest.Mock;
    mockedGetUsers.mockResolvedValue({
      data: {
        data: mockUsers,
        nextPage: 2,
      },
    });
    const { container } = render(
      <UsersListWithSearch onSelect={jest.fn()} search="rahul" />,
    );

    act(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(container.querySelectorAll("h1").length).toBe(2);
    });

    expect(mockedGetUsers).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      search: "rahul",
    });

    expect(
      screen.getByRole("heading", {
        name: /rahul patel/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /jane doe/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Load More/i,
      }),
    ).toBeInTheDocument();
  });
});
describe("UsersListWithSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AccountService.getUsers as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should not render 'Load More' button when there is no next page", async () => {
    const mockedGetUsers = AccountService.getUsers as jest.Mock;
    mockedGetUsers.mockResolvedValue({
      data: {
        data: mockUsers,
        nextPage: null,
      },
    });
    const { container } = render(<UsersListWithSearch onSelect={jest.fn()} />);

    await waitFor(() => {
      expect(container.querySelectorAll("h1").length).toBe(2);
    });

    expect(
      screen.queryByRole("button", {
        name: /Load More/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should render 'Create Group' button when isCreateGroup prop is true", async () => {
    const mockedGetUsers = AccountService.getUsers as jest.Mock;
    mockedGetUsers.mockResolvedValue({
      data: {
        data: mockUsers,
        nextPage: null,
      },
    });
    const { container } = render(
      <UsersListWithSearch onSelect={jest.fn()} isCreateGroup={true} />,
    );

    await waitFor(() => {
      expect(container.querySelectorAll("h1").length).toBe(2);
    });

    screen.logTestingPlaygroundURL();

    act(() => {
      const chekbox = screen.getAllByRole("checkbox");
      screen.debug(chekbox);
      fireEvent.click(chekbox[0]);
    });

    expect(
      screen.getByRole("button", {
        name: /Create Group/i,
      }),
    ).toBeInTheDocument();
  });
});

describe("UsersListWithSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AccountService.getUsers as jest.Mock).mockClear();
  });
  it("should render empty list when no users are available", async () => {
    const mockedGetUsers = AccountService.getUsers as jest.Mock;
    mockedGetUsers.mockResolvedValue({
      data: {
        data: [],
        nextPage: null,
      },
    });
    const { container } = render(<UsersListWithSearch onSelect={jest.fn()} />);

    await waitFor(() => {
      expect(container.querySelectorAll("h1").length).toBe(0);
    });

    expect(mockedGetUsers).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      search: "",
    });
  });
});
