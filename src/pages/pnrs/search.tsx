import { useAtomValue } from "jotai";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { pnrsAtom } from "../../lib/Atoms";

function App() {
  const pnrs = useAtomValue(pnrsAtom);
  const [query, setQuery] = useState("");

  const filtered = pnrs.filter((p) =>
    p.recordLocator.toLowerCase().includes(query.toLowerCase()),
  );
  const handleRowClick = (id: string) => {
    window.location.href = `/pnrs/details?id=${id}`;
  };

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
          Search PNRs
        </h1>
        <div className={css({ marginBottom: "10px" })}>
          <input
            type="text"
            placeholder="Record Locator"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={css({
              width: "100%",
              maxWidth: "300px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "8px",
            })}
          />
        </div>
        {filtered.length === 0 ? (
          <p>No matching PNRs.</p>
        ) : (
          <table className={css({ width: "100%", borderCollapse: "collapse" })}>
            <thead>
              <tr>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Record Locator
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Passengers
                </th>
                <th
                  className={css({
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                  })}
                >
                  Flights
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
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => handleRowClick(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRowClick(p.id);
                    }
                  }}
                  tabIndex={0}
                  className={css({
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  })}
                >
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.recordLocator}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.passengers.map((ps) => ps.name).join(", ")}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.flights.map((f) => f.flightNumber).join(", ")}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.note}
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

export default App;
