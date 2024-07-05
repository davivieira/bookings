import { render, screen } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import { Property } from "../../../types";

describe("PropertyCard", () => {
  const mockProperty: Property = {
    id: "0",
      userId: "0",
      name: "Luxury Lakeside Villa",
      location: "456 Lakefront Drive, Tahoe City, CA",
      price: 180,
      bookings: ["0"],
      description: "A luxurious lakeside villa offering breathtaking views of Lake Tahoe, private beach access, and elegant interiors.",
      picture: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=800&q=80"
  };

  it("renders property card with correct information", () => {
    render(<PropertyCard property={mockProperty} />);

    const propertyNameElement = screen.getByText(/Luxury Lakeside Villa/i);
    expect(propertyNameElement).toBeInTheDocument();

    const propertyDescriptionElement = screen.getByText(
      /A luxurious lakeside villa/i
    );
    expect(propertyDescriptionElement).toBeInTheDocument();

    const propertyPriceElement = screen.getByText(/U\$ 180,00/i);
    expect(propertyPriceElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<PropertyCard property={mockProperty} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
