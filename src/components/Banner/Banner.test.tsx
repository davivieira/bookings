import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner", () => {
  it("renders slogan correctly", () => {
    render(<Banner />);
    const sloganElement = screen.getByText(/Rent your next stay/i);
    expect(sloganElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Banner />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
