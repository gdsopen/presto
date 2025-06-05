# PNR Management

This project includes a minimal UI to manage Passenger Name Records (PNR). It is inspired by the PNRGOV EDIFACT guidelines and provides forms to capture key PNR data.

## Message Overview

PNRGOV defines several message types used between airlines and governments:

- **PNRGOV** – push PNR data to authorities
- **GOVREQ** – request specific PNRs
- **ACKRES** – acknowledge receipt or report functional errors
- **CONTRL** – EDIFACT syntax errors

Full, update and ad‑hoc pushes are distinguished by the MSG code. Emergency lock messages and GOVREQ queries are also supported.

## Data Model

The UI stores PNRs locally in the browser using Jotai. Each PNR contains:

- `recordLocator` – value of the `RCI` segment
- `passengers` – list of travellers from `TIF` / `FTI`
- `flights` – list of flight segments from `TVL`
- `note` – free text such as `IFT` or remarks

The shape is intentionally simplified to keep the demo small. A real implementation would also capture tickets, payments and history as described in the EDIFACT guide.

## Pages

- **PNRs list** – shows stored PNRs and links to create a new record.
- **New PNR** – form to enter record locator, passengers and flight segments.

The pages live under `src/pages/pnrs` and are automatically registered via `@generouted/react-router`.

