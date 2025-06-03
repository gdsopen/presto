import { invoke } from "@tauri-apps/api/core";
import { useAtom } from "jotai";
import * as PDF417 from "pdf417-generator";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getTicketFullData } from "../../../../api/client";
import { authTokenAtom, printerAtom } from "../../../../lib/Atoms";

type TicketData = {
  flightDate: string;
  compartment: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nameSuffix: string;
  operatingCarrier: string;
  flightNumber: string;
  departurePort: string;
  arrivalPort: string;
  seatNumber: string;
  checkInSequenceNumber: string;
  remarks: string;
  gateNumber?: string;
  boardingTime?: string;
  boardingGroup?: string;
};

export const CreatePass: React.FC = () => {
  const [selectedPrinter, _setSelectedPrinter] = useAtom(printerAtom);
  const [token, _setToken] = useAtom(authTokenAtom);
  const [ticketData, setTitcketData] = useState<TicketData>();
  const [imageByteArray, setImageByteArray] = useState<Uint8Array>();
  const [_barcodeByteArray, setBarcodeByteArray] = useState<Uint8Array>();
  const ticketSize = {
    width: 580,
    height: 1500,
  };

  const setFlightData = (id: string) => {
    getTicketFullData(id, token.token).then((data) => {
      const compartment = data.data?.flight?.compartmentCode || "";
      setTitcketData({
        flightDate: new Date(data.data?.flight?.departureDate || "")
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase(),
        compartment:
          compartment === "F"
            ? "FIRST CLASS"
            : compartment === "C"
              ? "BUSINESS CLASS"
              : compartment === "P"
                ? "PREMIUM ECONOMY"
                : "ECONOMY CLASS",
        firstName: data.data?.pnr?.firstName || "",
        lastName: data.data?.pnr?.lastName || "",
        middleName: data.data?.pnr?.middleName || "",
        nameSuffix: data.data?.pnr?.nameTitle || "",
        operatingCarrier: "",
        flightNumber: `${data.data?.flight?.operatingCarrier} ${data.data?.flight?.flightNumber}`,
        departurePort: data.data?.flight?.departurePort || "",
        arrivalPort: data.data?.flight?.arrivalPort || "",
        seatNumber: data.data?.flight?.seatNumber || "",
        checkInSequenceNumber: "0",
        remarks: data.data?.flight?.remarks || "",
        boardingGroup: "",
        gateNumber: "",
      });
    });
  };

  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const generateBarcode = () => {
    const canvas = barcodeCanvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    if (!ticketData) {
      return;
    }
    // 背景を白くする
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barcodeData = [
      ticketData.flightDate,
      ticketData.compartment,
      ticketData.firstName,
      ticketData.lastName,
      ticketData.middleName,
      ticketData.nameSuffix,
      ticketData.operatingCarrier,
      ticketData.flightNumber,
      ticketData.departurePort,
      ticketData.arrivalPort,
      ticketData.seatNumber,
      ticketData.checkInSequenceNumber,
      ticketData.remarks,
      ticketData.gateNumber,
      ticketData.boardingTime,
      ticketData.boardingGroup,
    ].join("\n");
    PDF417.draw(barcodeData, canvas, 3);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    if (!ticketData) {
      return;
    }
    const image = new Image();
    image.src = "/pass.webp";
    image.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, ticketSize.width, ticketSize.height);
      ctx.drawImage(image, 0, 0, ticketSize.width, ticketSize.height);
      ctx.translate(canvas.width / 2, canvas.height / 2); // キャンバスの中心に移動
      ctx.rotate(-Math.PI / 2); // 左に90度回転
      ctx.fillStyle = "black";
      ctx.font = "30px Roboto Mono";
      ctx.fillText(
        `${ticketData.firstName} ${ticketData.lastName} ${ticketData.middleName} ${ticketData.nameSuffix}`,
        -500,
        -175,
      );
      ctx.fillText(ticketData.flightDate, -180, -250);
      ctx.fillText(ticketData.compartment, -180, -210);
      ctx.fillText(ticketData.operatingCarrier, -500, -70);
      ctx.fillText(ticketData.departurePort, -300, -30);
      ctx.fillText(ticketData.arrivalPort, -300, 10);
      ctx.fillText(ticketData.flightNumber, 450, -80);
      ctx.fillText(`FROM ${ticketData.departurePort}`, 450, -40);
      ctx.fillText(`TO ${ticketData.arrivalPort}`, 450, -10);
      ctx.fillText(ticketData.remarks, -500, 220);
      ctx.font = "45px Roboto Mono";
      ctx.fillText(ticketData.flightNumber, -300, -120);
      ctx.fillText(ticketData.flightNumber, 450, -120);
      ctx.fillText(ticketData?.gateNumber || "", -500, 110);
      ctx.fillText(ticketData.boardingTime || "", -280, 110);
      ctx.fillText(ticketData.boardingGroup || "", 65, 110);
      ctx.fillText(ticketData.seatNumber, 200, 110);
      ctx.fillText(ticketData.seatNumber, 650, 20);
      ctx.rotate(Math.PI / 2); // 右に90度回転
      ctx.translate(canvas.width / 2, canvas.height / 2); // キャンバスの中心に移動

      generateBarcode();
      const barcodeCanvas = barcodeCanvasRef.current;
      if (!barcodeCanvas) {
        return;
      }
      ctx.drawImage(barcodeCanvas, 0, 0, 300, 300);
    };
    const type = "image/jpeg";
    const quality = 0.95;
    const dataUrl = canvas.toDataURL(type, quality);

    if (!dataUrl.startsWith("data:image/jpeg")) {
      console.error("The image format could not be determined");
      return;
    }

    const byteString = atob(dataUrl.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    setImageByteArray(uint8Array);

    const barcodeCanvas = barcodeCanvasRef.current;
    if (!barcodeCanvas) {
      return;
    }
    const barcodeDataUrl = barcodeCanvas.toDataURL(type, quality);
    if (!barcodeDataUrl.startsWith("data:image/jpeg")) {
      console.error("The image format could not be determined");
      return;
    }
    const barcodeByteString = atob(barcodeDataUrl.split(",")[1]);
    const barcodeArrayBuffer = new ArrayBuffer(barcodeByteString.length);
    const barcodeUint8Array = new Uint8Array(barcodeArrayBuffer);
    for (let i = 0; i < barcodeByteString.length; i++) {
      barcodeUint8Array[i] = barcodeByteString.charCodeAt(i);
    }
    setBarcodeByteArray(barcodeUint8Array);
  };

  const { register, handleSubmit } = useForm<{ id: string }>();
  const onSubmit = async (data: { id: string }) => {
    await setFlightData(data.id);
    // ticketDataがセットされるまで待つ
    await new Promise((resolve) => setTimeout(resolve, 100));

    generateImage();
  };

  const printImage = () => {
    invoke("image_print", {
      vendorId: selectedPrinter.vendor_id,
      deviceId: selectedPrinter.device_id,
      image: imageByteArray,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search by ID"
          {...register("id")}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "8px",
            cursor: "pointer",
          }}
        >
          Generate
        </button>
        <button
          type="button"
          onClick={printImage}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Print
        </button>
      </form>
      <canvas ref={barcodeCanvasRef} width={ticketSize.width} height={300} />
      <canvas
        ref={canvasRef}
        width={ticketSize.width}
        height={ticketSize.height}
      />
    </>
  );
};
