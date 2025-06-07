import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { getPnrByName } from "../../api/client";
import type { components } from "../../api/generated/types";
import { MainLayout } from "../../layouts/MainLayout";
import { authTokenAtom } from "../../lib/Atoms";

// APIから取得したPNRデータの型定義
type PNRData = components["schemas"]["PassengerNameRecord"] & {
  id?: string;
  passengers?: Array<{ name: string }>;
  flights?: Array<{ flightNumber: string }>;
  recordLocator?: string;
  note?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/search")({
  component: SearchPnrsPage,
  path: "search",
  getParentRoute: () => import("./index").then((mod) => mod.Route),
});

function SearchPnrsPage() {
  const token = useAtomValue(authTokenAtom);
  const [pnrs, setPnrs] = useState<PNRData[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 検索用のdebounce効果
  useEffect(() => {
    if (!query.trim()) {
      setPnrs([]);
      setError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        if (!token.token) {
          setError("認証トークンが見つかりません");
          setLoading(false);
          return;
        }

        const response = await getPnrByName(
          token.token,
          query.trim().toUpperCase(),
        );
        if (response.data) {
          // APIレスポンスが単一のPNRの場合、配列に変換
          const pnrArray = Array.isArray(response.data)
            ? response.data
            : [response.data];

          // APIデータをPNRData型に変換
          const convertedPnrs: PNRData[] = pnrArray.map(
            (pnrData: components["schemas"]["PassengerNameRecord"]) => ({
              ...pnrData,
              id: pnrData.pnrId,
              recordLocator: pnrData.pnrId,
              passengers: [
                { name: `${pnrData.firstName} ${pnrData.lastName}` },
              ],
              flights: [], // フライト情報は別途取得が必要な場合があります
              note: pnrData.documentType || "",
            }),
          );

          setPnrs(convertedPnrs);
        } else {
          setPnrs([]);
        }
      } catch (err) {
        setError(`PNRの取得に失敗しました: ${err}`);
        setPnrs([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, token.token]);

  const handleRowClick = (id: string) => {
    navigate({ to: "/pnrs/details", search: { id } });
  };

  return (
    <MainLayout>
      <div>
        <div className={css({ marginBottom: "20px" })}>
          <button
            type="button"
            onClick={() => navigate({ to: "/pnrs" })}
            className={css({
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              marginBottom: "20px",
            })}
          >
            ← Back
          </button>
        </div>
        <h1
          className={css({
            fontSize: "1.7rem",
            fontWeight: "700",
            color: "#333",
          })}
        >
          Search PNRs
        </h1>
        <div className={css({ marginBottom: "10px" })}>
          <input
            type="text"
            placeholder="名前を入力してください"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className={css({
              width: "100%",
              maxWidth: "300px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "8px",
            })}
          />
        </div>

        {loading && <p>検索中...</p>}

        {error && <p style={{ color: "red" }}>エラー: {error}</p>}

        {!loading && !error && query.trim() && pnrs.length === 0 && (
          <p>該当するPNRが見つかりませんでした。</p>
        )}

        {!loading && !error && pnrs.length > 0 && (
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
              {pnrs.map((p: PNRData) => (
                <tr
                  key={p.id}
                  onClick={() => p.id && handleRowClick(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && p.id) {
                      handleRowClick(p.id);
                    }
                  }}
                  tabIndex={0}
                  className={css({
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  })}
                >
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
                    {p.passengers
                      ?.map((ps: { name: string }) => ps.name)
                      .join(", ")}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.flights
                      ?.map((f: { flightNumber: string }) => f.flightNumber)
                      .join(", ")}
                  </td>
                  <td
                    className={css({
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    })}
                  >
                    {p.flights?.map((f) => f.flightNumber).join(", ")}
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
