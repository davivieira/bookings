export type Property = {
  id: string
  userId: string
  name: string
  location: string
  description: string
  picture: string
  price: number,
  bookings: string[]
}

export type Booking = {
  id: string
  userId: string
  propertyId: string
  checkinDate: string
  checkoutDate: string
}

export type BookingResponse = {
  id: string
  userId: string
  property: Property
  checkinDate: string
  checkoutDate: string
}

export type User = {
  id: string
  name: string
  email: string
  properties: string[]
}

export type AppState = {
  user: {
    currentUser: User | null;
  };
}

