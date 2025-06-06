import { createFileRoute } from "@tanstack/react-router";

import { useAtomValue } from "jotai";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { flightReservationsAtom } from "../../lib/Atoms";
// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/flight-reservations")({
  component: FlightReservationsPage,
});

function FlightReservationsPage() {
  const flights = useAtomValue(flightReservationsAtom);

  return (
    <MainLayout>
      <div>
        <h1
          className={css({
            fontSize: "1.7rem",
            fontWeight: "700",
            color: "#333",
          })}
        >
          Flight Reservations
        </h1>
        <div className={css({ marginBottom: "10px" })}>
          <a href="/flight-reservations/new">
            <button
              type="button"
              className={css({
                padding: "8px 16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#60abe0",
                color: "#fff",
                cursor: "pointer",
              })}
            >
              New Flight Reservation
            </button>
          </a>
        </div>
        {flights.length === 0 ? (
          <p>No flight reservations yet.</p>
        ) : (
          <table
            className={css({
              width: "100%",
              borderCollapse: "collapse",
            })}
          >
            <thead>
              <tr>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Passenger
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Flight No
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  From
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  To
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Date
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Time
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Seat
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id}>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.passengerName}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.flightNumber}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.departure}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.arrival}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.date}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.time}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.seat}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {f.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}

export default FlightReservationsPage;
