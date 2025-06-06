import { useForm } from "react-hook-form";
import { css } from "../../styled-system/css";
import { LoginInput } from "./LoginInput";

type LoginFormData = {
  id: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
};

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <div
      className={css({
        padding: "20px",
        width: "100%",
        maxWidth: "400px",
      })}
    >
      <h2
        className={css({
          fontSize: "1.5rem",
          fontWeight: "600",
          textAlign: "center",
        })}
      >
        Login with @presto
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput label="ID" id="id" register={register} errors={errors} />
        <LoginInput
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={css({
            width: "100%",
            padding: "12px",
            backgroundColor: "#60abe0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "#4d8fc0",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              cursor: "not-allowed",
            },
          })}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div
        className={css({
          paddingY: "10px",
        })}
      >
        <p>Forget password? Ask to your operation team admin.</p>
      </div>
    </div>
  );
};
