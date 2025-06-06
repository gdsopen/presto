import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { css } from "../../styled-system/css";

type LoginFormData = {
  id: string;
  password: string;
};

type LoginInputProps = {
  label: string;
  id: keyof LoginFormData;
  type?: string;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
};

export const LoginInput = ({
  label,
  id,
  type = "text",
  register,
  errors,
}: LoginInputProps) => {
  return (
    <div
      className={css({
        marginBottom: "20px",
      })}
    >
      <label
        htmlFor={id}
        className={css({
          display: "block",
          marginBottom: "5px",
          fontWeight: "600",
        })}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, { required: `${label}は必須です` })}
        className={css({
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          "&:focus": {
            outline: "none",
            borderColor: "#60abe0",
          },
        })}
      />
      {errors[id] && (
        <p
          className={css({
            color: "red",
            fontSize: "0.8rem",
            marginTop: "5px",
          })}
        >
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};
