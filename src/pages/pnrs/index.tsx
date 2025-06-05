import { useAtomValue } from "jotai";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { pnrsAtom } from "../../lib/Atoms";

function App() {
  const pnrs = useAtomValue(pnrsAtom);

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
          PNRs
        </h1>
        <div className={css({ marginBottom: "10px" })}>
          <a href="/pnrs/new">
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
              New PNR
            </button>
          </a>
        </div>
        {pnrs.length === 0 ? (
          <p>No PNRs yet.</p>
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
              {pnrs.map((p) => (
                <tr key={p.id}>
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
