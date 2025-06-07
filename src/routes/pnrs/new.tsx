import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { css } from "../../../styled-system/css";
import { createFlightRecord, createPassengerPNR } from "../../api/client";
import type { components } from "../../api/generated/types";
import { MainLayout } from "../../layouts/MainLayout";
import { authTokenAtom } from "../../lib/Atoms";
import { generateRecordLocator } from "../../lib/utils";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/new")({
  component: NewPnrPage,
});

// フォーム用の型定義
type FormData = {
  recordLocator: string;
  passengers: Array<{
    firstName: string;
    lastName: string;
    middleName?: string;
    nameTitle: string;
    documentType: string;
  }>;
  flights: Array<{
    departurePort: string;
    arrivalPort: string;
    operatingCarrier: string;
    flightNumber: number;
    departureDate: string;
    compartmentCode: string;
    seatNumber?: string;
  }>;
  note: string;
};

function NewPnrPage() {
  const token = useAtomValue(authTokenAtom);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      recordLocator: generateRecordLocator(),
      passengers: [
        {
          firstName: "",
          lastName: "",
          middleName: "",
          nameTitle: "MR",
          documentType: "P",
        },
      ],
      flights: [
        {
          departurePort: "",
          arrivalPort: "",
          operatingCarrier: "",
          flightNumber: 0,
          departureDate: "",
          compartmentCode: "Y",
          seatNumber: "",
        },
      ],
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

  const onSubmit = async (data: FormData) => {
    if (!token.token) {
      alert("認証トークンがありません");
      return;
    }

    setIsSubmitting(true);
    try {
      // 各乗客に対してPNRを作成
      for (const passenger of data.passengers) {
        const pnrData: components["schemas"]["PassengerNameRecord"] = {
          pnrId: data.recordLocator,
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          middleName: passenger.middleName || "",
          nameTitle: passenger.nameTitle,
          passengerDescription: 1,
          documentType: passenger.documentType,
        };

        const pnrResult = await createPassengerPNR(token.token, pnrData);

        if (pnrResult.error) {
          alert(`PNR作成エラー: ${pnrResult.error}`);
          return;
        }

        // 各フライトレコードを作成
        for (const flight of data.flights) {
          const flightData: components["schemas"]["PassengerFlightRecord"] = {
            pnrId: data.recordLocator,
            departurePort: flight.departurePort,
            arrivalPort: flight.arrivalPort,
            operatingCarrier: flight.operatingCarrier,
            flightNumber: flight.flightNumber,
            departureDate: flight.departureDate,
            compartmentCode: flight.compartmentCode,
            seatNumber: flight.seatNumber || "",
          };

          const flightResult = await createFlightRecord(
            token.token,
            flightData,
          );

          if (flightResult.error) {
            alert(`フライトレコード作成エラー: ${flightResult.error}`);
            return;
          }
        }
      }

      alert("PNRが正常に作成されました");
      reset();
      // biome-ignore lint/suspicious/noExplicitAny: router uses any
      navigate({ to: "/pnrs" as any });
    } catch (error) {
      console.error("PNR作成エラー:", error);
      alert(`エラーが発生しました: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
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
            <div
              key={field.id}
              className={css({
                marginBottom: "10px",
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "5px",
              })}
            >
              <input
                placeholder="名"
                {...register(`passengers.${idx}.firstName` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                })}
              />
              <input
                placeholder="姓"
                {...register(`passengers.${idx}.lastName` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                placeholder="ミドルネーム（任意）"
                {...register(`passengers.${idx}.middleName` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <select
                {...register(`passengers.${idx}.nameTitle` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              >
                <option value="MR">MR</option>
                <option value="MS">MS</option>
                <option value="MRS">MRS</option>
                <option value="DR">DR</option>
              </select>
              <select
                {...register(`passengers.${idx}.documentType` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              >
                <option value="P">パスポート</option>
                <option value="D">運転免許証</option>
                <option value="I">身分証明書</option>
              </select>
              {passengerFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePassenger(idx)}
                  className={css({ marginTop: "4px", color: "red" })}
                >
                  削除
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addPassenger({
                firstName: "",
                lastName: "",
                middleName: "",
                nameTitle: "MR",
                documentType: "P",
              })
            }
          >
            乗客を追加
          </button>
        </div>
        <div>
          <h2 className={css({ fontSize: "1.2rem", fontWeight: "700" })}>
            Flights
          </h2>
          {flightFields.map((field, idx) => (
            <div
              key={field.id}
              className={css({
                marginBottom: "10px",
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "5px",
              })}
            >
              <input
                placeholder="出発空港コード"
                {...register(`flights.${idx}.departurePort` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                })}
              />
              <input
                placeholder="到着空港コード"
                {...register(`flights.${idx}.arrivalPort` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                placeholder="航空会社コード"
                {...register(`flights.${idx}.operatingCarrier` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <input
                type="number"
                placeholder="便名"
                {...register(`flights.${idx}.flightNumber` as const, {
                  valueAsNumber: true,
                })}
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
                placeholder="出発日"
                {...register(`flights.${idx}.departureDate` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              />
              <select
                {...register(`flights.${idx}.compartmentCode` as const)}
                className={css({
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "8px",
                  marginTop: "4px",
                })}
              >
                <option value="Y">エコノミークラス</option>
                <option value="C">ビジネスクラス</option>
                <option value="F">ファーストクラス</option>
              </select>
              <input
                placeholder="座席番号（任意）"
                {...register(`flights.${idx}.seatNumber` as const)}
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
                  className={css({ marginTop: "4px", color: "red" })}
                >
                  削除
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addFlight({
                departurePort: "",
                arrivalPort: "",
                operatingCarrier: "",
                flightNumber: 0,
                departureDate: "",
                compartmentCode: "Y",
                seatNumber: "",
              })
            }
          >
            フライトを追加
          </button>
        </div>
        <div>
          <label htmlFor="pnr-note">備考</label>
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
          disabled={isSubmitting}
          className={css({
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: isSubmitting ? "#ccc" : "#000",
            color: "#fff",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          })}
        >
          {isSubmitting ? "保存中..." : "保存"}
        </button>
      </form>
    </MainLayout>
  );
}
