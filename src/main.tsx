import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import IndexPage from "./pages";
import FlightReservationsPage from "./pages/flight-reservations";
import NewFlightReservationPage from "./pages/flight-reservations/new";
import HomePage from "./pages/home";
import PnrsPage from "./pages/pnrs";
import PnrDetailsPage from "./pages/pnrs/details";
import NewPnrPage from "./pages/pnrs/new";
import SearchPnrsPage from "./pages/pnrs/search";
import ReservationsPage from "./pages/reservations";
import NewReservationPage from "./pages/reservations/new";
import UsersPage from "./pages/users";
import InviteUserPage from "./pages/users/invite";
import UserMePage from "./pages/users/me";
import UserOtherPage from "./pages/users/other";
import "./index.css";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});

const reservationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservations",
  component: ReservationsPage,
});

const reservationsNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservations/new",
  component: NewReservationPage,
});

const flightReservationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flight-reservations",
  component: FlightReservationsPage,
});

const flightReservationsNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flight-reservations/new",
  component: NewFlightReservationPage,
});

const pnrsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pnrs",
  component: PnrsPage,
});

const pnrsNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pnrs/new",
  component: NewPnrPage,
});

const pnrsSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pnrs/search",
  component: SearchPnrsPage,
});

const pnrDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pnrs/details",
  component: PnrDetailsPage,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UsersPage,
});

const usersInviteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/invite",
  component: InviteUserPage,
});

const usersMeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/me",
  component: UserMePage,
});

const usersOtherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/other",
  component: UserOtherPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  reservationsRoute,
  reservationsNewRoute,
  flightReservationsRoute,
  flightReservationsNewRoute,
  pnrsRoute,
  pnrsNewRoute,
  pnrsSearchRoute,
  pnrDetailsRoute,
  usersRoute,
  usersInviteRoute,
  usersMeRoute,
  usersOtherRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
