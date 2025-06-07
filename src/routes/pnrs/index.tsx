import { createFileRoute, Link } from "@tanstack/react-router";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";
import { MenuCard } from "../../components/MenuCard";
import { IconPlus, IconSearch } from "@tabler/icons-react";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs")({
  component: PnrsPage,
  path: "pnrs",
});

function PnrsPage() {
  const menuItems = [
    {
      title: "Create Reservation",
      icon: <IconPlus />,
      description: "Create a new reservation",
      path: "/pnrs/new",
    },
    {
      title: "Search Reservation",
      icon: <IconSearch />,
      description: "Search for a reservation",
      path: "/pnrs/search",
    },
  ];
  return (
    <MainLayout>
      <h2 className={css({ fontSize: "1.5rem", fontWeight: "bold" })}>
        Reservation & Gate Control
      </h2>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
        })}
      >
        {menuItems.map((item) => (
          <Link key={item.title} to={item.path}>
            <MenuCard title={item.title} icon={item.icon}>
              <p>{item.description}</p>
            </MenuCard>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}
