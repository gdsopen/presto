import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { updateUser } from "../../../api/client";
import type { components } from "../../../api/generated/types";
import { useAuth } from "../../../hooks/useLoginValidation";
import { MainLayout } from "../../../layouts/MainLayout";
import { authTokenAtom } from "../../../lib/Atoms";

function App() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<
    components["schemas"]["UpdateUser"]
  >({
    defaultValues: {
      name: user?.name || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user, reset]);

  const token = useAtomValue(authTokenAtom);

  const onSubmit = async (data: components["schemas"]["UpdateUser"]) => {
    const res = await updateUser(token.token, data);
    if (res.error) {
      alert(res.error);
    } else {
      alert("User updated successfully");
    }
    window.location.reload();
    reset();
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
        Account Settings
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            })}
          >
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              })}
            />
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            })}
          >
            <label htmlFor="newPassword">New Password</label>
            <input
              {...register("newPassword")}
              type="password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              })}
            />
          </div>
          <div
            className={css({
              padding: "10px",
              marginY: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#e0f8ff",
            })}
          >
            <p>To confirm your changes, please enter your current password.</p>
            <label
              htmlFor="currentPassword"
              className={css({
                fontWeight: "700",
                color: "#333",
              })}
            >
              Current Password
            </label>
            <input
              {...register("currentPassword")}
              type="password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            />
          </div>
          <button
            type="submit"
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
            })}
          >
            Update
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default App;
