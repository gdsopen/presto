import { Route as rootRoute } from "./routes/__root";
import { Route as FlightReservationsRouteImport } from "./routes/flight-reservations/index";
import { Route as FlightReservationsNewRouteImport } from "./routes/flight-reservations/new/index";
import { Route as HomeRouteImport } from "./routes/home/index";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as PnrDetailsRouteImport } from "./routes/pnrs/details";
import { Route as PnrsRouteImport } from "./routes/pnrs/index";
import { Route as PnrsNewRouteImport } from "./routes/pnrs/new";
import { Route as PnrsSearchRouteImport } from "./routes/pnrs/search";
import { Route as ReservationsRouteImport } from "./routes/reservations/index";
import { Route as ReservationsNewRouteImport } from "./routes/reservations/new/index";
import { Route as UsersRouteImport } from "./routes/users/index";
import { Route as UsersInviteRouteImport } from "./routes/users/invite/index";
import { Route as UsersMeRouteImport } from "./routes/users/me/index";
import { Route as UsersOtherRouteImport } from "./routes/users/other/index";

const IndexRoute = IndexRouteImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
});

const HomeRoute = HomeRouteImport.update({
  path: "/home",
  getParentRoute: () => rootRoute,
});

const ReservationsRoute = ReservationsRouteImport.update({
  path: "/reservations",
  getParentRoute: () => rootRoute,
});

const ReservationsNewRoute = ReservationsNewRouteImport.update({
  path: "/reservations/new",
  getParentRoute: () => ReservationsRoute,
});

const FlightReservationsRoute = FlightReservationsRouteImport.update({
  path: "/flight-reservations",
  getParentRoute: () => rootRoute,
});

const FlightReservationsNewRoute = FlightReservationsNewRouteImport.update({
  path: "/flight-reservations/new",
  getParentRoute: () => FlightReservationsRoute,
});

const PnrsRoute = PnrsRouteImport.update({
  path: "/pnrs",
  getParentRoute: () => rootRoute,
});

const PnrsNewRoute = PnrsNewRouteImport.update({
  path: "/pnrs/new",
  getParentRoute: () => PnrsRoute,
});

const PnrsSearchRoute = PnrsSearchRouteImport.update({
  path: "/pnrs/search",
  getParentRoute: () => PnrsRoute,
});

const PnrDetailsRoute = PnrDetailsRouteImport.update({
  path: "/pnrs/details",
  getParentRoute: () => PnrsRoute,
});

const UsersRoute = UsersRouteImport.update({
  path: "/users",
  getParentRoute: () => rootRoute,
});

const UsersInviteRoute = UsersInviteRouteImport.update({
  path: "/users/invite",
  getParentRoute: () => UsersRoute,
});

const UsersMeRoute = UsersMeRouteImport.update({
  path: "/users/me",
  getParentRoute: () => UsersRoute,
});

const UsersOtherRoute = UsersOtherRouteImport.update({
  path: "/users/other",
  getParentRoute: () => UsersRoute,
});

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  HomeRoute,
  ReservationsRoute.addChildren([ReservationsNewRoute]),
  FlightReservationsRoute.addChildren([FlightReservationsNewRoute]),
  PnrsRoute.addChildren([PnrsNewRoute, PnrsSearchRoute, PnrDetailsRoute]),
  UsersRoute.addChildren([UsersInviteRoute, UsersMeRoute, UsersOtherRoute]),
]);
