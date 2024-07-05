# Bookings App

## Summary
In this app the user is able to: 
- Search Properties
- Make/Cancel Bookings

This app is a front-end demo app. So, due to the timeline to develop the project, I'll be focusing only in React and the booking logic, design and structure. I'll build other resources for supporting the front-end application, but they will be used essentially to provide data to front-end (e.g.: Authentication, Server, DB).

## Requirements
- User can make many bookings (as soon as they don't overlap).
- User cannot book his own property.
- Multiple Users cannot book the same property with overlapping time.
- When user is logged in and searches properties, he doesn't see his own properties on the list

## Tech Stack

Vite: For a fast build tool and development server.
TypeScript: For type safety and better development experience.
Mui: Material UI as my components library.
Mui Styled Components: For component-level styling.
React Router: For navigation.
Redux Toolkit: For global state management.
React Query: For avoiding unnecessary useEffect usage, adding a good caching functionality and helping to fetch data.
Formik + Yup: For form handling and validation.
React Testing Library + Jest: For testing.
React Datepicker: For date selection.
dayjs: For date manipulation.

## Usage

```
npm start
```

It will run the server and the react application. For login you can use only emails: johndoe@example.com, janedoe@example.com, jimdoe@example.com and jilldoe@example.com. For double-checking purposes you can see the server/db.js file. The 'database' is just an object, so once you reload the page the db will restart. The login though is persistent through sessions (until you close the tab).

## Main Folder Structure (src)

#### api
Implementation of all api calls, using axios and react-query combined.

#### components
The main app folder. Here we have logical components that compose the application. Divided in semantic folders (Example: Everything related to bookings is placed in /components/Bookings folder)

#### features
Redux standard feature folder. In this app I decided to use redux for managing the user state. The state related to bookings and properties is managed by react-query, with caching and mutations. I wouldn't be necessary to usa a library just for that purpose, but foreseeing that this app would need more data in redux store in the future I decided to use. Also it was a chance to demonstrate the usage of redux + react-query

#### hooks
Simple hooks for code re-usage.

#### pages
The application routes.

#### shared
Utility components that are meant to be shared across many ares in this app.

#### styles
Global styled components.

#### types
Global types

#### utils
General utilities should be placed in here.

## Personal Considerations

Due to a 5 days deadline to finish this exercise, I focused on front-end work with a simplified view of what a booking app should look like. The app is fully responsive, working well in different screen sizes. There are, of course, dozens of improvements to implement at this app, but in general a tried to use, as much as I could, different React functionalities: Suspense, Error Boundaries, Lazy Loading, Hooks, etc.

## Next Imaginary Steps for this app

There are possible next steps for this app, some decisions that would need to be done, for example, are we going to a cloud solution approach for some back-end capabilities or will we use on premises infrastructure? I'll mention some bullet points:

1. Implement a real database solution for the app. Considering entities that need to be strongly related to each other and entities that we predict that may evolve more frequently over the years, so the we can decide what to put in a SQL database and what to put in a NOSQL database.
2. Test automation with cypress: currently we have a good unit test coverage, but a good balance between unit testing and e2e tests are needed. I would cover the main flows with automation tests.
3. Add more booking information to the Booking entity and consequently give the user the ability to update the booking.
4. Real Authentication solution, with password included, encryption, JWT/PASETO, storage, etc.
5. Currently is not possible to register properties as well. This should be a valid feature as well, and the Property entity should evolve with new fields also.
6. More and more refactors and tools to make development pleasant at this project. I tried to add a lucid organization to this app, for example, a path alias '@' to avoid importing components with a long '../../../../../'.



