import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../../../styled-system/css";
import {
  type PassengerFlightRecordResponse,
  getPassBaseData,
} from "../../../../api/client";
import { authTokenAtom } from "../../../../lib/Atoms";

export const GenPass: React.FC = () => {
  const [token, _setToken] = useAtom(authTokenAtom);
  const [flights, setFlights] = useState<PassengerFlightRecordResponse[]>([]);

  const pass = async (id: string) => {
    await getPassBaseData(id, token.token).then((res) => {
      setFlights(res.data as PassengerFlightRecordResponse[]);
    });
  };
  const { register, handleSubmit } = useForm<{ id: string }>();
  const onSubmit = (data: { id: string }) => {
    pass(data.id);
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css({
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
            gap: "10px",
          })}
        >
          <input
            type="text"
            {...register("id")}
            className={css({
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            })}
          />
          <button
            type="submit"
            className={css({
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            })}
          >
            Get Information
          </button>
        </form>

        <table
          className={css({
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          })}
        >
          <thead>
            <tr>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                ID
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                PNR ID
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Departure Port
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Arrival Port
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Operating Carrier
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Flight Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Departure Date
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Compartment Code
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Seat Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Check In Sequence Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  textAlign: "left",
                })}
              >
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr
                key={flight.id}
                className={css({
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                })}
              >
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.id}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.pnrId}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.departurePort}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.arrivalPort}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.operatingCarrier}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.flightNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.departureDate}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.compartmentCode}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.seatNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.checkInSequenceNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  })}
                >
                  {flight.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
