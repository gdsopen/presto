import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { CreatePass } from "./_components/CreatePass";
import { GenPass } from "./_components/GenPass";
import { GetInfoByName } from "./_components/GetInfoByName";

function Sales() {
  return (
    <MainLayout>
      <main
        className={css({
          padding: "20px",
        })}
      >
        <h2>Pax Data Search</h2>
        <GetInfoByName />
        <GenPass />
        <CreatePass />
      </main>
    </MainLayout>
  );
}

export default Sales;
