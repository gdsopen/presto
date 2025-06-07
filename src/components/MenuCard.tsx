import { css } from "../../styled-system/css";

export const MenuCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={css({
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        _hover: {
          backgroundColor: "#f0f0f0",
        },
      })}
    >
      <div
        className={css({ display: "flex", alignItems: "center", gap: "15px" })}
      >
        {icon}
        <h3 className={css({ fontSize: "1.2rem", fontWeight: "bold" })}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};
