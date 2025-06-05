import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { MainLayout } from "../../../layouts/MainLayout";
import {
  type FlightReservation,
  flightReservationsAtom,
} from "../../../lib/Atoms";

function App() {
  const [flights, setFlights] = useAtom(flightReservationsAtom);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<
    Omit<FlightReservation, "id">
  >({
    defaultValues: {
      passengerName: "",
      flightNumber: "",
      departure: "",
      arrival: "",
      date: "",
      time: "",
      seat: "",
      note: "",
    },
  });

  const onSubmit = (data: Omit<FlightReservation, "id">) => {
    setFlights([...flights, { id: Date.now().toString(), ...data }]);
    reset();
    // biome-ignore lint/suspicious/noExplicitAny: router uses any
    navigate({ to: "/flight-reservations" as any });
  };

  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        New Flight Reservation
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        })}
      >
        <div>
          <label htmlFor="fr-passenger">Passenger</label>
          <input
            id="fr-passenger"
            {...register("passengerName")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-flightNumber">Flight No</label>
          <input
            id="fr-flightNumber"
            {...register("flightNumber")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-departure">From</label>
          <input
            id="fr-departure"
            {...register("departure")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-arrival">To</label>
          <input
            id="fr-arrival"
            {...register("arrival")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-date">Date</label>
          <input
            id="fr-date"
            type="date"
            {...register("date")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-time">Time</label>
          <input
            id="fr-time"
            type="time"
            {...register("time")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-seat">Seat</label>
          <input
            id="fr-seat"
            {...register("seat")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="fr-note">Note</label>
          <textarea
            id="fr-note"
            {...register("note")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <button
          type="submit"
          className={css({
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          })}
        >
          Save
        </button>
      </form>
    </MainLayout>
  );
}

export default App;
