import { useAtom } from "jotai";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { MainLayout } from "../../../layouts/MainLayout";
import { pnrsAtom, type Pnr } from "../../../lib/Atoms";
import { generateRecordLocator } from "../../../lib/utils";

function App() {
  const [pnrs, setPnrs] = useAtom(pnrsAtom);
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm<Omit<Pnr, "id">>({
    defaultValues: {
      recordLocator: generateRecordLocator(),
      passengers: [{ name: "", rph: "", ffp: "" }],
      flights: [{ flightNumber: "", from: "", to: "", date: "", seat: "" }],
      note: "",
    },
  });
  const {
    fields: passengerFields,
    append: addPassenger,
    remove: removePassenger,
  } = useFieldArray({ control, name: "passengers" });
  const {
    fields: flightFields,
    append: addFlight,
    remove: removeFlight,
  } = useFieldArray({ control, name: "flights" });

  const onSubmit = (data: Omit<Pnr, "id">) => {
    setPnrs([...pnrs, { id: Date.now().toString(), ...data }]);
    reset();
    navigate("/pnrs");
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
        New PNR
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "600px",
        })}
      >
        <div>
          <label htmlFor="pnr-record">Record Locator</label>
          <input
            id="pnr-record"
            {...register("recordLocator")}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              fontFamily: "monospace",
            })}
          />
        </div>
        <div>
          <h2 className={css({ fontSize: "1.2rem", fontWeight: "700" })}>
            Passengers
          </h2>
          {passengerFields.map((field, idx) => (
            <div key={field.id} className={css({ marginBottom: "10px" })}>
              <input
                placeholder="Name"
                {...register(`passengers.${idx}.name` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                })}
              />
              <input
                placeholder="RPH"
                {...register(`passengers.${idx}.rph` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                placeholder="FFP"
                {...register(`passengers.${idx}.ffp` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              {passengerFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePassenger(idx)}
                  className={css({ marginTop: "4px" })}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addPassenger({ name: "", rph: "", ffp: "" })}
          >
            Add Passenger
          </button>
        </div>
        <div>
          <h2 className={css({ fontSize: "1.2rem", fontWeight: "700" })}>
            Flights
          </h2>
          {flightFields.map((field, idx) => (
            <div key={field.id} className={css({ marginBottom: "10px" })}>
              <input
                placeholder="Flight Number"
                {...register(`flights.${idx}.flightNumber` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                })}
              />
              <input
                placeholder="From"
                {...register(`flights.${idx}.from` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                placeholder="To"
                {...register(`flights.${idx}.to` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                type="date"
                placeholder="Date"
                {...register(`flights.${idx}.date` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                placeholder="Seat"
                {...register(`flights.${idx}.seat` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              {flightFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFlight(idx)}
                  className={css({ marginTop: "4px" })}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addFlight({
                flightNumber: "",
                from: "",
                to: "",
                date: "",
                seat: "",
              })
            }
          >
            Add Flight
          </button>
        </div>
        <div>
          <label htmlFor="pnr-note">Note</label>
          <textarea
            id="pnr-note"
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
