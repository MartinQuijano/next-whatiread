import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
    };
  },
}));

describe("Book card", () => {
  test("renders correctly", () => {
    render(<BookCard title="title" date="date" />);

    const pTitle = screen.getByText("title");
    const pDate = screen.getByText("date");

    expect(pTitle).toBeInTheDocument();
    expect(pDate).toBeInTheDocument();
  });
});
