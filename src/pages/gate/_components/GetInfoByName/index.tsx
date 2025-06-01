import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../../../styled-system/css";
import {
  type PassengerFlightRecordResponse,
  getPnrByName,
} from "../../../../api/client";
import { authTokenAtom } from "../../../../lib/Atoms";

export const GetInfoByName: React.FC = () => {
  const [token, _setToken] = useAtom(authTokenAtom);
  const [flights, setFlights] = useState<PassengerFlightRecordResponse[]>([]);

  const pass = async ({
    firstName,
    lastName,
    middleName,
  }: {
    firstName: string;
    lastName?: string;
    middleName?: string;
  }) => {
    await getPnrByName({ firstName, lastName, middleName }, token.token).then(
      (res) => {
        setFlights(res.data as PassengerFlightRecordResponse[]);
      },
    );
  };
  const { register, handleSubmit } = useForm<{
    firstName: string;
    lastName?: string;
    middleName?: string;
  }>();
  const onSubmit = (data: {
    firstName: string;
    lastName?: string;
    middleName?: string;
  }) => {
    pass(data);
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
            gap: "8px",
          })}
        >
          <input
            {...register("firstName")}
            placeholder="FirstName"
            className={css({
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            })}
          />
          <input
            {...register("lastName")}
            placeholder="LastName"
            className={css({
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            })}
          />
          <input
            {...register("middleName")}
            placeholder="MiddleName"
            className={css({
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
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
              _hover: {
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
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                ID
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                PNR ID
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Departure Port
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Arrival Port
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Operating Carrier
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Flight Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Departure Date
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Compartment Code
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Seat Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                })}
              >
                Check In Sequence Number
              </th>
              <th
                className={css({
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
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
                  _hover: {
                    backgroundColor: "#f5f5f5",
                  },
                })}
              >
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.id}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.pnrId}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.departurePort}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.arrivalPort}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.operatingCarrier}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.flightNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.departureDate}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.compartmentCode}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.seatNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  })}
                >
                  {flight.checkInSequenceNumber}
                </td>
                <td
                  className={css({
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
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
