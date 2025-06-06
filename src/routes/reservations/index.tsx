import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { reservationsAtom } from "../../lib/Atoms";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/reservations")({
  component: ReservationsPage,
});

function ReservationsPage() {
  const reservations = useAtomValue(reservationsAtom);

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
          Reservations
        </h1>
        <div className={css({ marginBottom: "10px" })}>
          <a href="/reservations/new">
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
              New Reservation
            </button>
          </a>
        </div>
        {reservations.length === 0 ? (
          <p>No reservations yet.</p>
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
                  Name
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
                  People
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
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {r.name}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {r.date}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {r.time}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {r.people}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {r.note}
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
