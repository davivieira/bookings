import { render, fireEvent } from "@testing-library/react";
import LoginModalGroup from "./LoginModalGroup";

jest.mock("../../../shared/GenericModal/GenericModal", () => jest.fn(({ open, handleClose, children }) => (
  <div data-testid="mocked-generic-modal" data-open={open}>
    <button onClick={handleClose}>Close Modal</button>
    {children}
  </div>
)));

jest.mock("../LoginForm/LoginForm", () => jest.fn(({ handleClose }) => (
  <div data-testid="mocked-login-form">
    Mocked LoginForm Component
    <button onClick={handleClose}>Close Login Form</button>
  </div>
)));

describe("LoginModalGroup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login button", () => {
    const { getByText } = render(<LoginModalGroup />);
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("opens modal on login button click", () => {
    const { getByText, getByTestId } = render(<LoginModalGroup />);
    fireEvent.click(getByText("Login"));
    expect(getByTestId("mocked-generic-modal")).toHaveAttribute("data-open", "true");
  });

  it("renders LoginForm inside modal", () => {
    const { getByText, getByTestId } = render(<LoginModalGroup />);
    fireEvent.click(getByText("Login"));
    expect(getByTestId("mocked-login-form")).toBeInTheDocument();
  });

  it("closes modal on close button click", () => {
    const { getByText, getByTestId } = render(<LoginModalGroup />);
    fireEvent.click(getByText("Login"));
    fireEvent.click(getByText("Close Modal"));
    expect(getByTestId("mocked-generic-modal")).toHaveAttribute("data-open", "false");
  });

  it("closes LoginForm on close button click inside modal", () => {
    const { getByText, getByTestId } = render(<LoginModalGroup />);
    fireEvent.click(getByText("Login"));
    fireEvent.click(getByText("Close Login Form"));
    expect(getByTestId("mocked-generic-modal")).toHaveAttribute("data-open", "false");
  });
});
