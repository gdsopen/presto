import createClient from "openapi-fetch";
import type { paths } from "./generated/types";

const endpoint = import.meta.env.VITE_PUBLIC_ENDPOINT;

const client = createClient<paths>({ baseUrl: endpoint });

export const login = (login: string, password: string) =>
  client.POST("/accounts/login", {
    body: {
      login: login,
      password: password,
    },
  });

export const userId = async (token: string) => {
  try {
    const res = await client.GET("/accounts/info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to fetch user data: ${e}`);
  }
};

export const getUserData = async (token: string) => {
  try {
    const res = await userId(token);
    return res?.data?.login;
  } catch (e) {
    throw new Error(`getUserData error: ${e}`);
  }
};

export type PassengerNameRecord = {
  email: string;
  pnrId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nameTitle: string;
  passengerDescription: string;
  checkInSource?: string;
  boardingPassIssuanceSource?: string;
  issuanceDate?: string;
  documentType?: string;
  boardingPassIssuerDesignator?: string;
  baggageTagNumber?: string;
  firstBaggageTagNumber?: string;
  secondBaggageTagNumber?: string;
  securityDataType?: string;
  securityData?: string;
  passengerUserId?: string;
};

export type PassengerFlightRecord = {
  pnrId: string;
  departurePort: string;
  arrivalPort: string;
  operatingCarrier: string;
  flightNumber: number;
  departureDate: string;
  compartmentCode: string;
  seatNumber?: string;
  checkInSequenceNumber?: number;
  passengerUserId?: string;
  remarks?: string;
};

export type PassengerFlightRecordResponse = {
  id: string;
  pnrId: string;
  departurePort: string;
  arrivalPort: string;
  operatingCarrier: string;
  flightNumber: number;
  departureDate: string;
  compartmentCode: string;
  seatNumber?: string;
  checkInSequenceNumber?: number;
  passengerUserId?: string;
  remarks?: string;
};

export const createPaggengerRecord = async (
  pnr: PassengerNameRecord,
  token: string,
) => {
  try {
    const res = await client.POST("/pnr/passenger", {
      headers: { Authorization: `Bearer ${token}` },
      body: {
        email: pnr.email,
        pnrId: pnr.pnrId,
        firstName: pnr.firstName,
        lastName: pnr.lastName,
        middleName: pnr.middleName,
        nameTitle: pnr.nameTitle,
        passengerDescription: Number(pnr.passengerDescription),
        checkInSource: pnr.checkInSource,
        boardingPassIssuanceSource: pnr.boardingPassIssuanceSource,
        issuanceDate: pnr.issuanceDate,
        documentType: pnr.documentType,
        boardingPassIssuerDesignator: pnr.boardingPassIssuerDesignator,
        baggageTagNumber: pnr.baggageTagNumber,
        firstBaggageTagNumber: pnr.firstBaggageTagNumber,
        secondBaggageTagNumber: pnr.secondBaggageTagNumber,
        securityDataType: pnr.securityDataType,
        securityData: pnr.securityData,
      },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to create passenger record: ${e}`);
  }
};

export const createFlightRecord = async (
  flight: PassengerFlightRecord,
  token: string,
) => {
  try {
    const res = await client.POST("/pnr/flight", {
      headers: { Authorization: `Bearer ${token}` },
      body: {
        pnrId: flight.pnrId,
        departurePort: flight.departurePort,
        arrivalPort: flight.arrivalPort,
        operatingCarrier: flight.operatingCarrier,
        flightNumber: Number(flight.flightNumber),
        departureDate: flight.departureDate,
        compartmentCode: flight.compartmentCode,
        seatNumber: flight.seatNumber,
        checkInSequenceNumber: flight.checkInSequenceNumber,
      },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to create flight record: ${e}`);
  }
};

export const getAllFlightRecord = async (token: string) => {
  try {
    const res = await client.GET("/pnr/flight", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get all flight records: ${e}`);
  }
};

export const getPassBaseData = async (id: string, token: string) => {
  try {
    const res = await client.POST("/pass", {
      headers: { Authorization: `Bearer ${token}` },
      body: {
        id: id,
      },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get passenger base data: ${e}`);
  }
};

type PassengerSearchProps = {
  firstName: string;
  lastName?: string;
  middleName?: string;
};

export const getPnrByName = async (
  data: PassengerSearchProps,
  token: string,
) => {
  try {
    const res = await client.POST("/pass/passenger", {
      headers: { Authorization: `Bearer ${token}` },
      body: {
        ...data,
      },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get passenger base data: ${e}`);
  }
};

type TicketResponse = {
  data: {
    flight: {
      compartmentCode: string;
      departureDate: string;
      operatingCarrier: string;
      flightNumber: number;
      departurePort: string;
      arrivalPort: string;
      seatNumber: string;
      remarks: string;
    };
    pnr: {
      firstName: string;
      lastName: string;
      middleName: string;
      nameTitle: string;
    };
  };
};

export const getTicketFullData = async (
  id: string,
  token: string,
): Promise<TicketResponse> => {
  const response = await client.POST("/pass", {
    body: { id },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data as TicketResponse;
};
