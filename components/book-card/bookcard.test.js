import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import userEvent from "@testing-library/user-event";
import { remove } from "../../services/book";

jest.mock("../../services/book", () => ({
  remove: jest.fn().mockResolvedValue(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    reload: jest.fn(),
  }),
}));

describe("Book card", () => {
  test("should render correctly", () => {
    render(<BookCard title="title" date="date" />);

    const pTitle = screen.getByText("title");
    const pDate = screen.getByText("date");

    expect(pTitle).toBeInTheDocument();
    expect(pDate).toBeInTheDocument();

    const cornerFlip = screen.queryByTestId("corner-flip");
    expect(cornerFlip).not.toBeInTheDocument();
  });

  test("should display the delete icon on hover", async () => {
    const user = userEvent.setup({ skipHover: true });
    render(<BookCard title="title" date="date" />);

    const bookCard = screen.getByTestId("book-card");
    let cornerFlip = screen.queryByTestId("corner-flip");
    expect(bookCard).toBeInTheDocument();
    expect(cornerFlip).not.toBeInTheDocument();

    await user.hover(bookCard);
    cornerFlip = screen.queryByTestId("corner-flip");
    expect(cornerFlip).toBeInTheDocument();
  });

  test("should call remove on delete icon click", async () => {
    const user = userEvent.setup({ skipHover: true });
    render(<BookCard title="Test Book" date="01/01/2022" />);
    const bookCard = screen.getByTestId("book-card");
    await user.hover(bookCard);
    const deleteIcon = screen.getByTestId("corner-flip");
    await user.click(deleteIcon);

    expect(remove).toHaveBeenCalledWith("Test Book");
  });
});
