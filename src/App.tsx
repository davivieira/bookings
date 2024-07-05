import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "./reactQuery";
import { setCurrentUser } from "./features/userSlice";
import { User } from "./types";
import React, { Suspense } from "react";
import ErrorBoundary from "./shared/ErrorBoundary/ErrorBoundary";
import LoadingPage from "./shared/LoadingPage/LoadingPage";

const Home = React.lazy(() => import("./pages/Home"));
const Results = React.lazy(() => import("./pages/Results"));
const Bookings = React.lazy(() => import("./pages/Bookings"));
const PrivateRoute = React.lazy(() => import("./pages/PrivateRoute"));

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(String(sessionStorage.getItem("user"))) as User;
  dispatch(setCurrentUser(user));

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/results" Component={Results} />
            <Route Component={PrivateRoute}>
              <Route path="/bookings" Component={Bookings} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
