import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { MainLayout } from "../../../layouts/MainLayout";
import { reservationsAtom, type Reservation } from "../../../lib/Atoms";

function App() {
  const [reservations, setReservations] = useAtom(reservationsAtom);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Omit<Reservation, "id">>({
    defaultValues: {
      name: "",
      date: "",
      time: "",
      people: 1,
      note: "",
    },
  });

  const onSubmit = (data: Omit<Reservation, "id">) => {
    setReservations([...reservations, { id: Date.now().toString(), ...data }]);
    reset();
    navigate("/reservations");
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
        New Reservation
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
          <label htmlFor="r-name">Name</label>
          <input
            id="r-name"
            {...register("name")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="r-date">Date</label>
          <input
            id="r-date"
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
          <label htmlFor="r-time">Time</label>
          <input
            id="r-time"
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
          <label htmlFor="r-people">People</label>
          <input
            id="r-people"
            type="number"
            {...register("people", { valueAsNumber: true })}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          />
        </div>
        <div>
          <label htmlFor="r-note">Note</label>
          <textarea
            id="r-note"
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
