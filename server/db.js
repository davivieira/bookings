const db = {
  users: [
    {
      id: "0",
      name: "John Doe",
      email: "johndoe@example.com",
      properties: ["0", "1"],
    },
    {
      id: "1",
      name: "Jane Doe",
      email: "janedoe@example.com",
      properties: ["2", "3"],
    },
    {
      id: "2",
      name: "Jim Doe",
      email: "jimdoe@example.com",
      properties: ["4", "5"],
    },
    {
      id: "3",
      name: "Jill Doe",
      email: "jilldoe@example.com",
      properties: [],
    }
  ],
  bookings: [{
    id: "0",
    userId: "1",
    propertyId: "0",
    checkinDate: "07-07-2024",
    checkoutDate: "07-13-2024"
  }],
  properties: [
    {
      id: "0",
      userId: "0",
      name: "Luxury Lakeside Villa",
      location: "456 Lakefront Drive, Tahoe City, CA",
      price: 180,
      bookings: ["0"],
      description: "A luxurious lakeside villa offering breathtaking views of Lake Tahoe, private beach access, and elegant interiors.",
      picture: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=800&q=80"
    },
    {
      id: "1",
      userId: "0",
      name: "Mountain View Retreat",
      location: "789 Mountain Peak Road, Aspen, CO",
      price: 250,
      bookings: [],
      description: "An exclusive mountain retreat nestled in the Aspen Highlands, featuring panoramic mountain views and luxurious amenities.",
      picture: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=800&q=80"
    },
    {
      id: "2",
      userId: "1",
      name: "Riverside Paradise",
      location: "123 Riverbank Drive, Portland, OR",
      price: 120,
      bookings: [],
      description: "Experience serenity by the river at this luxurious retreat with tranquil riverside views, lush gardens, and modern comforts.",
      picture: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80"
    },
    {
      id: "7",
      userId: "3",
      name: "Sunset Cliff Villa",
      location: "789 Cliffside Drive, Malibu, CA",
      price: 260,
      bookings: [],
      description: "Enjoy breathtaking sunsets from this cliffside villa overlooking the Pacific Ocean, featuring expansive terraces and luxury amenities.",
      picture: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?fit=crop&w=800&q=80"
    },
    {
      id: "10",
      userId: "3",
      name: "Cliffside Luxury Retreat",
      location: "789 Cliffside Drive, Big Sur, CA",
      price: 250,
      bookings: [],
      description: "A breathtaking cliffside property with panoramic ocean views, modern amenities, and an unparalleled sense of privacy.",
      picture: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80"
    },
    {
      id: "11",
      userId: "0",
      name: "Secluded Beach Cottage",
      location: "123 Seaside Lane, Santa Monica, CA",
      price: 160,
      bookings: [],
      description: "A charming beach cottage offering privacy, stunning ocean views, and direct access to a secluded beach.",
      picture: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=800&q=80"
    },
    {
      id: "12",
      userId: "0",
      name: "Urban Oasis Condo",
      location: "456 City Center Blvd, Seattle, WA",
      price: 900,
      bookings: [],
      description: "An urban oasis in the heart of Seattle, featuring modern design, luxury amenities, and easy access to downtown attractions.",
      picture: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?fit=crop&w=800&q=80"
    },
    {
      id: "15",
      userId: "2",
      name: "Countryside Manor",
      location: "456 Country Lane, Woodstock, VT",
      price: 180,
      bookings: [],
      description: "A beautiful countryside manor offering expansive grounds, elegant interiors, and a peaceful rural setting.",
      picture: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=800&q=80"
    },
    {
      id: "16",
      userId: "2",
      name: "Modern Mountain Chalet",
      location: "789 Alpine Drive, Vail, CO",
      price: 270,
      bookings: [],
      description: "A modern chalet nestled in the Vail Mountains, offering luxurious accommodations, stunning views, and outdoor activities.",
      picture: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fit=crop&w=800&q=80"
    },
    {
      id: "17",
      userId: "3",
      name: "Tropical Beachfront Villa",
      location: "123 Paradise Cove, Maui, HI",
      price: 350,
      bookings: [],
      description: "A tropical beachfront villa with direct access to pristine beaches, lush gardens, and high-end amenities for ultimate relaxation.",
      picture: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?fit=crop&w=800&q=80"
    },
    {
      id: "18",
      userId: "3",
      name: "Luxury Penthouse Suite",
      location: "456 Skyline Drive, Miami, FL",
      price: 300,
      bookings: [],
      description: "A luxury penthouse suite with panoramic ocean views, modern design, and access to exclusive amenities in vibrant Miami.",
      picture: "https://images.unsplash.com/photo-1512820790803-83ca734da794?fit=crop&w=800&q=80"
    },
    {
      id: "19",
      userId: "3",
      name: "Rustic Cabin Retreat",
      location: "789 Forest Road, Blue Ridge, GA",
      price: 950,
      bookings: [],
      description: "A rustic cabin retreat nestled in the Blue Ridge Mountains, offering cozy accommodations, beautiful views, and outdoor activities.",
      picture: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=800&q=80"
    },
    {
      id: "20",
      userId: "3",
      name: "Cozy Mountain Chalet",
      location: "321 Mountain View Drive, Breckenridge, CO",
      price: 200,
      bookings: [],
      description: "A cozy chalet in Breckenridge, offering stunning mountain views, luxurious amenities, and proximity to ski resorts.",
      picture: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=800&q=80"
    },
    {
      id: "22",
      userId: "0",
      name: "Urban Loft Apartment",
      location: "456 Downtown Street, Los Angeles, CA",
      price: 120,
      bookings: [],
      description: "A chic urban loft in downtown LA, featuring modern design, high ceilings, and easy access to city attractions.",
      picture: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80"
    },
    {
      id: "23",
      userId: "1",
      name: "Mountain View Cabin",
      location: "789 Alpine Road, Park City, UT",
      price: 180,
      bookings: [],
      description: "A cozy cabin with stunning mountain views, luxurious amenities, and proximity to world-class skiing.",
      picture: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fit=crop&w=800&q=80"
    },
    {
      id: "25",
      userId: "2",
      name: "Lakeside Cabin",
      location: "654 Lakefront Drive, Lake Placid, NY",
      price: 130,
      bookings: [],
      description: "A cozy lakeside cabin with stunning views, modern amenities, and access to outdoor activities year-round.",
      picture: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?fit=crop&w=800&q=80"
    },
    {
      id: "26",
      userId: "2",
      name: "Modern Urban Condo",
      location: "123 City Center Blvd, Boston, MA",
      price: 950,
      bookings: [],
      description: "A stylish urban condo in downtown Boston, offering modern design, luxury amenities, and easy access to city attractions.",
      picture: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=800&q=80"
    },
    {
      id: "27",
      userId: "3",
      name: "Tropical Island Villa",
      location: "789 Paradise Island, Bahamas",
      price: 550,
      bookings: [],
      description: "A luxurious island villa with private beach access, stunning ocean views, and high-end amenities for the ultimate tropical getaway.",
      picture: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=800&q=80"
    },
    {
      id: "28",
      userId: "3",
      name: "Ski-In/Ski-Out Chalet",
      location: "456 Mountain Trail, Aspen, CO",
      price: 320,
      bookings: [],
      description: "A luxury chalet with ski-in/ski-out access, stunning mountain views, and modern amenities for the perfect winter retreat.",
      picture: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=800&q=80"
    }
  ]
};

export default db;