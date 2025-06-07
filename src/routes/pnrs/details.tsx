import { createFileRoute, useSearch } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { encode } from "bcbp";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { css } from "../../../styled-system/css";
import { getPassengerPNR } from "../../api/client";
import type { components } from "../../api/generated/types";
import { MainLayout } from "../../layouts/MainLayout";
import { authTokenAtom, printerAtom } from "../../lib/Atoms";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/details")({
  component: PnrDetail,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string,
    };
  },
});

function PnrDetail() {
  const { id } = useSearch({ from: "/pnrs/details" });
  const { vendor_id, device_id } = useAtomValue(printerAtom);
  const [pnr, setPnr] = useState<
    components["schemas"]["PassengerNameRecordWithFlights"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAtomValue(authTokenAtom);

  useEffect(() => {
    const fetchPNRs = async () => {
      try {
        if (!token) {
          setError("認証トークンが見つかりません");
          return;
        }
        const response = await getPassengerPNR(token.token, id || "");
        if (response) {
          setPnr(response);
        }
      } catch (err) {
        setError(
          `PNRの取得に失敗しました: ${
            err instanceof Error ? err.message : "Unknown error"
          }`,
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPNRs();
    } else {
      setError("PNR IDが指定されていません");
      setLoading(false);
    }
  }, [id, token]);

  // 搭乗券データを事前に準備（useMemoで最適化）
  const bcbpData = useMemo(() => {
    if (!pnr) return null;

    return encode({
      data: {
        passengerName: `${pnr.firstName} ${pnr.lastName}`,
        passengerDescription: `${pnr.firstName} ${pnr.lastName}`,
        //W - Web  K - Airport Kiosk  R - Remote or Off Site Kiosk  M - Mobile Device  O - Airport Agent  T - Town Agent  V - Third Party Vendor
        checkInSource: pnr.checkInSource || "W",
        boardingPassIssuanceSource: pnr.boardingPassIssuanceSource || "O",
        issuanceDate: pnr.issuanceDate
          ? new Date(pnr.issuanceDate)
          : new Date(),
        documentType: pnr.documentType || "B",
        boardingPassIssuerDesignator: pnr.boardingPassIssuerDesignator || "XA",
        legs: pnr.passengerFlightRecord.map((flight) => ({
          operatingCarrierPNR: flight.pnrId,
          departureAirport: flight.departurePort,
          arrivalAirport: flight.arrivalPort,
          operatingCarrierDesignator: flight.operatingCarrier,
          flightNumber: flight.flightNumber.toString().padStart(4, "0"),
          flightDate: new Date(flight.departureDate),
          compartmentCode: flight.compartmentCode,
          seatNumber: flight.seatNumber || "N/A",
          checkInSequenceNumber:
            flight.checkInSequenceNumber?.toString() || "1",
          passengerStatus: "1",
          marketingCarrierDesignator: flight.operatingCarrier,
          idIndicator: "1",
        })),
      },
      meta: {
        formatCode: "M",
        numberOfLegs: 1,
        electronicTicketIndicator: "E",
        versionNumber: 6,
      },
    });
  }, [pnr]);

  const generateBoardingPassFromSVG = async (flightData: {
    name1: string;
    name2: string;
    from: string | undefined;
    to: string | undefined;
    seat: string | undefined | null;
    gate: string | null;
    departuretime: string | null;
    flightairflightnum: string | null;
    operatingcareer: string | undefined;
    note: string | null;
    class: string | undefined;
    fromairport: string | undefined;
    toairport: string | undefined;
    boardingtime: string | null;
  }): Promise<Uint8Array> => {
    // SVGファイルを読み込み
    const response = await fetch("/boardingpass.svg");
    if (!response.ok) {
      throw new Error("SVGファイルの読み込みに失敗しました");
    }
    let svgContent = await response.text();

    // プレースホルダーを実際の値で置き換え
    svgContent = svgContent.replace(
      /name1name2/g,
      `${flightData.name1}${flightData.name2}`,
    );
    svgContent = svgContent.replace(/>name1</g, `>${flightData.name1}<`);
    svgContent = svgContent.replace(/>name2</g, `>${flightData.name2}<`);
    svgContent = svgContent.replace(
      /FROM from/g,
      `FROM ${flightData.from || "N/A"}`,
    );
    svgContent = svgContent.replace(
      /TO {3}to/g,
      `TO   ${flightData.to || "N/A"}`,
    );
    svgContent = svgContent.replace(
      /SEAT seat/g,
      `SEAT ${flightData.seat || "N/A"}`,
    );
    svgContent = svgContent.replace(/>seat</g, `>${flightData.seat || "N/A"}<`);
    svgContent = svgContent.replace(
      /GATE gate/g,
      `GATE ${flightData.gate || "TBD"}`,
    );
    svgContent = svgContent.replace(/>gate</g, `>${flightData.gate || "TBD"}<`);
    svgContent = svgContent.replace(
      />departuretime</g,
      `>${flightData.departuretime || "N/A"}<`,
    );
    svgContent = svgContent.replace(
      /flightairflightnum OPERATED BY operatingcareer/g,
      `${flightData.flightairflightnum || "N/A"} OPERATED BY ${
        flightData.operatingcareer || "N/A"
      }`,
    );
    svgContent = svgContent.replace(/>note</g, `>${flightData.note || ""}<`);
    svgContent = svgContent.replace(
      />class</g,
      `>${flightData.class || "N/A"}<`,
    );
    svgContent = svgContent.replace(
      />fromairport</g,
      `>${flightData.fromairport || "N/A"}<`,
    );
    svgContent = svgContent.replace(
      />toairport</g,
      `>${flightData.toairport || "N/A"}<`,
    );
    svgContent = svgContent.replace(
      />boardingtime</g,
      `>${flightData.boardingtime || "N/A"}<`,
    );

    // SVGをImageオブジェクトとして読み込み
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // キャンバスを作成してSVGを描画（印刷に適したサイズに設定）
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context の取得に失敗しました"));
          return;
        }

        // 印刷に適したサイズを設定（搭乗券として十分な解像度）
        const targetWidth = 640;
        const targetHeight = 1300;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 背景を白色で塗りつぶし
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // SVGをキャンバスに適切にスケールして描画
        const scaleX = targetWidth / (img.width || targetWidth);
        const scaleY = targetHeight / (img.height || targetHeight);
        const scale = Math.min(scaleX, scaleY); // アスペクト比を保持

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        // キャンバスからBlobを作成
        canvas.toBlob(async (blob) => {
          if (blob) {
            const arrayBuffer = await blob.arrayBuffer();
            resolve(new Uint8Array(arrayBuffer));
          } else {
            reject(new Error("Blobの作成に失敗しました"));
          }
        }, "image/png");
      };

      img.onerror = () => {
        reject(new Error("SVG画像の読み込みに失敗しました"));
      };

      // SVGをdata URLとして設定
      const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      img.src = url;
    });
  };

  const handlePrintBoardingPass = async () => {
    if (!bcbpData || !pnr) return;

    try {
      const firstFlight = pnr.passengerFlightRecord[0];
      const flightData = {
        name1: pnr.firstName,
        name2: pnr.lastName,
        from: firstFlight?.departurePort,
        to: firstFlight?.arrivalPort,
        seat: firstFlight?.seatNumber,
        gate: null,
        departuretime: firstFlight
          ? new Date(firstFlight.departureDate).toLocaleTimeString()
          : null,
        flightairflightnum: firstFlight
          ? `${firstFlight.operatingCarrier}${firstFlight.flightNumber}`
          : null,
        operatingcareer: firstFlight?.operatingCarrier,
        note: null,
        class: firstFlight?.compartmentCode,
        fromairport: firstFlight?.departurePort,
        toairport: firstFlight?.arrivalPort,
        boardingtime: null,
      };

      // SVGから搭乗券画像を生成
      const imageData = await generateBoardingPassFromSVG(flightData);

      console.log(bcbpData);
      console.log(vendor_id, device_id);

      await invoke("pass_print", {
        vendorId: vendor_id,
        deviceId: device_id,
        bcbpData: bcbpData,
        imageData: Array.from(imageData), // Uint8ArrayをArrayに変換
      });
    } catch (error) {
      console.error("搭乗券の印刷に失敗しました:", error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div>読み込み中...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div>エラー: {error}</div>
      </MainLayout>
    );
  }

  if (!pnr) {
    return (
      <MainLayout>
        <div>PNRが見つかりません</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <div className={css({ marginBottom: "20px" })}>
          <button
            type="button"
            onClick={() => window.history.back()}
            className={css({
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              marginBottom: "20px",
              marginRight: "10px",
            })}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handlePrintBoardingPass}
            className={css({
              padding: "8px 16px",
              border: "1px solid #4CAF50",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
              marginBottom: "20px",
            })}
          >
            Print Boarding Pass
          </button>
        </div>

        <h1
          className={css({
            fontSize: "1.7rem",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
          })}
        >
          PNR Details
        </h1>

        <div
          className={css({
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          })}
        >
          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Record Locator
            </h2>
            <p>{pnr.pnrId}</p>
          </div>

          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Passenger Information
            </h2>
            <div>
              <p>
                <strong>Name:</strong> {pnr.nameTitle} {pnr.firstName}{" "}
                {pnr.middleName} {pnr.lastName}
              </p>
              <p>
                <strong>Passenger Description:</strong>{" "}
                {pnr.passengerDescription}
              </p>
            </div>
          </div>

          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Flights
            </h2>
            {pnr.passengerFlightRecord.map((flight, index) => (
              <div
                key={`${flight.pnrId}-${index}`}
                className={css({
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                })}
              >
                <p>
                  <strong>Flight:</strong> {flight.operatingCarrier}
                  {flight.flightNumber}
                </p>
                <p>
                  <strong>Route:</strong> {flight.departurePort} →{" "}
                  {flight.arrivalPort}
                </p>
                <p>
                  <strong>Departure Date:</strong>{" "}
                  {new Date(flight.departureDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Seat:</strong> {flight.seatNumber}
                </p>
                <p>
                  <strong>Class:</strong> {flight.compartmentCode}
                </p>
              </div>
            ))}
          </div>

          <div className={css({ marginBottom: "20px" })}>
            <h2
              className={css({
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "10px",
              })}
            >
              Document Information
            </h2>
            <div>
              <p>
                <strong>Document Type:</strong> {pnr.documentType}
              </p>
              <p>
                <strong>Issuance Date:</strong>{" "}
                {pnr.issuanceDate
                  ? new Date(pnr.issuanceDate).toLocaleDateString()
                  : "N/A"}
              </p>
              {pnr.boardingPassIssuerDesignator && (
                <p>
                  <strong>Issuer Designator:</strong>{" "}
                  {pnr.boardingPassIssuerDesignator}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
