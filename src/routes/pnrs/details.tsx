import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { pnrsAtom } from "../../lib/Atoms";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/details")({
  component: PnrDetail,
});

function PnrDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const pnrs = useAtomValue(pnrsAtom);
  console.log("URL ID:", id);
  console.log("All PNRs:", pnrs);
  const pnr = pnrs.find((p) => p.id === id?.toString());

  if (!pnr) {
    return (
      <MainLayout>
        <div>PNR not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <div className={css({ marginBottom: "20px" })}>
          <button
            type="button"
            onClick={() => window.history.back()}
            className={css({
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              marginBottom: "20px",
            })}
          >
            ← Back
          </button>
        </div>

        <h1
          className={css({
            fontSize: "1.7rem",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
          })}
        >
          PNR Details
        </h1>

        <div
          className={css({
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          })}
        >
          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Record Locator
            </h2>
            <p>{pnr.recordLocator}</p>
          </div>

          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Passengers
            </h2>
            <ul>
              {pnr.passengers.map((passenger) => (
                <li key={passenger.name}>{passenger.name}</li>
              ))}
            </ul>
          </div>

          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Flights
            </h2>
            <ul>
              {pnr.flights.map((flight) => (
                <li key={flight.flightNumber}>
                  {flight.flightNumber} - {flight.from} to {flight.to}
                </li>
              ))}
            </ul>
          </div>

          {pnr.note && (
            <div>
              <h2
                className={css({
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                })}
              >
                Note
              </h2>
              <p>{pnr.note}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
